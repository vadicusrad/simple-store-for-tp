import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import getData from '../api/getData';
import { nanoid } from 'nanoid';

export interface IProduct {
    name: string;
    image_url: string;
    logo_url: string;
    category: string;
    views: number;
    start_date: string;
    end_date: string;
    discount: string;
    stars: number | string;
    old_price: string | number;
    new_price?: string | number;
    disclaimer?: string;
}

export interface IAdaptedProduct extends IProduct {
    id: string;
}

export interface ProductState {
    allProducts: IAdaptedProduct[];
    visibleProducts: IAdaptedProduct[];
    productsNotFound: boolean;
    currentProduct: IAdaptedProduct | null;
    currentSortCondition: string;
    currentPage: number;
    loading: boolean;
    error: null | string;
}

const initialState: ProductState = {
    allProducts: [],
    visibleProducts: [],
    productsNotFound: false,
    currentProduct: null,
    currentSortCondition: 'by-name',
    currentPage: 1,
    loading: false,
    error: null,
};

// Предварительная адаптация полученных данных до добавления в стейт
function adaptGoods(goods: IProduct[]): IAdaptedProduct[] {
    // Добавляю каждому элементу массива id
    let newGoodsArray = goods.map((item) => {
        return {
            ...item,
            id: nanoid(5),
        };
    });
    // Предварительно по умолчанию сортирую по названию товара по возрастанию
    newGoodsArray.sort(function (a, b) {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA > nameB) return 1;
        if (nameA < nameB) return -1;
        return 0;
    });

    return newGoodsArray;
}

//  В качестве усложнения и практики работы с Thunk получаю данные из удаленного сервера, а не из файла json
export const getProducts = createAsyncThunk<
    IProduct[],
    void,
    { rejectValue: string }
>('products/getProducts', async function (_, { rejectWithValue }) {
    const response = getData();

    if (!(await response).ok) {
        return rejectWithValue('Server error!');
    }
    const data = await (await response).json();
    return data;
});

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // функция поиска по названию продукта
        filterBySearchString: (state, action: PayloadAction<string>) => {
            const foundItems = state.allProducts.filter((item) =>
                item.name.toLowerCase().includes(action.payload.toLowerCase())
            );
            if (foundItems) {
                state.visibleProducts = foundItems;
                state.productsNotFound = false;
            }
            if (!foundItems.length) {
                state.productsNotFound = true;
            }
        },
        // функция фильтрациии массива для получения одного обьекта по id
        getSingleProduct: (state, action) => {
            const currentProduct = state.allProducts.find(
                (item) => item.id === action.payload
            );
            if (currentProduct) {
                state.currentProduct = currentProduct;
            }
        },
        // Функция утсанавливает текущий способ соритровка данных в поле стейта
        setCurrentSortCondition: (state, action: PayloadAction<string>) => {
            state.currentSortCondition = action.payload;
        },
        // функция сортировки данных в зависимости от установленного способа в стейте
        sortProductsByCurrentSortCondition: (state) => {
            // создаю переменную для сортировки в которую кладу все продукты
            let arrayToSort = state.allProducts;
            // если выбрана котегория продуктов то в переменную для сортировки кладу продукты из выбранной категории
            if (state.visibleProducts.length) {
                arrayToSort = state.visibleProducts;
            }
            switch (state.currentSortCondition) {
                // сортировка по названию
                case 'by-name':
                    arrayToSort = arrayToSort.sort(function (a, b) {
                        let nameA = a.name.toLowerCase();
                        let nameB = b.name.toLowerCase();
                        if (nameA > nameB)
                            //сортируем строки по возрастанию
                            return 1;
                        if (nameA < nameB) return -1;
                        return 0; // Никакой сортировки
                    });

                    break;
                // сортирока по просмотрам
                case 'by-views':
                    arrayToSort = arrayToSort.sort(
                        (prev, next) => next.views - prev.views
                    );
                    break;
                // сортировка по дате начала ротации товара
                case 'by-start-date':
                    arrayToSort.sort(function (a, b) {
                        return (
                            +new Date(a.start_date) - +new Date(b.start_date)
                        ); //сортировка по возрастающей дате
                    });
                    break;
                // сортировка по дате окончания ротации товара
                case 'by-end-date':
                    arrayToSort.sort(function (a, b) {
                        return (
                            +new Date(b.start_date) - +new Date(a.start_date)
                        ); //сортировка по убывающей дате
                    });
                    break;
                default:
                    break;
            }
        },
        // функция разворота массива
        reverseProductsArray: (state) => {
            state.visibleProducts.reverse();
        },
        showAllProducts: (state) => {
            state.visibleProducts = state.allProducts;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    // экстра редьюсеры для работы с асинхронными запросами
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;
            // Добавляю в стейт товары после их адаптации(добавления новых свойств не предусмотренных апи - добавляю id)
            const adaptedGoods = adaptGoods(action.payload);

            state.allProducts = adaptedGoods;
            state.visibleProducts = adaptedGoods;
        });
        // Обработка ошибки на сервере
        builder.addCase(getProducts.rejected, (state, error) => {
            if (error.payload) {
                state.error = error.payload;
            }
            state.loading = false;
        });
    },
});

export const {
    getSingleProduct,
    filterBySearchString,
    sortProductsByCurrentSortCondition,
    setCurrentSortCondition,
    reverseProductsArray,
    showAllProducts,
    setCurrentPage,
} = productSlice.actions;

export default productSlice.reducer;
