import React, { useEffect } from 'react';
import styles from './MainPage.module.scss';
import { getProducts, showAllProducts } from '../../features/productSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks';
import usePagination from '../../hooks/usePagination';
import FilterTools from './filterTools/FilterTools';
import SortingTools from './sortingTools/SortingTools';
import PageNavigation from './pageNavigation/PageNavigation';
import ProductList from './productList/ProductList';
import LoadingAnimation from './LoadingAnimation';

const MainPage = () => {
    const dispatch = useAppDispatch();
    const loadingStatus = useAppSelector((state) => state.products.loading);
    const productsNotFound = useAppSelector(
        (state) => state.products.productsNotFound
    );
    const errorCase = useAppSelector((state) => state.products.error);
    // запускается функция получения продуктов
    useEffect(() => {
        dispatch(getProducts());
    }, []);

    // список продуктов для отображения пользователю
    const visibleProducts = useAppSelector(
        (state) => state.products.visibleProducts
    );
    // реализация хука пагинации
    const {
        firstContentIndex,
        lastContentIndex,
        nextPage,
        prevPage,
        page,
        setPage,
        totalPages,
    } = usePagination({
        contentPerPage: 5,
        count: visibleProducts.length,
    });

    // функция отображения всех продуктов на странице
    function handleShowAllProducts() {
        dispatch(showAllProducts());
    }

    return (
        <div className={styles.mainPage}>
            <h1 className={styles.mainPage__header}>Карточки контента</h1>
            <div className={styles.mainPage__selectors}>
                <SortingTools />
                <FilterTools />
            </div>

            {loadingStatus && <LoadingAnimation />}
            {visibleProducts.length ? (
                <div>
                    <PageNavigation
                        nextPage={nextPage}
                        prevPage={prevPage}
                        setPage={setPage}
                        totalPages={totalPages}
                        page={page}
                    />

                    <ProductList
                        firstContentIndex={firstContentIndex}
                        lastContentIndex={lastContentIndex}
                    />
                </div>
            ) : null}

            {/* Если поле товары не найдены истинно и список товаров для отображения пуст то показать инструкции для пользователя */}
            {productsNotFound && !visibleProducts.length && (
                <>
                    <h2 className={styles.mainPage__header}>
                        Товары не найдены, попробуйте еще раз
                    </h2>
                    <button
                        className={styles.mainPage__btn}
                        onClick={handleShowAllProducts}
                    >
                        Показать все товары
                    </button>
                </>
            )}
            {/* Если произошла ошибка пользователь увидит сообщение*/}
            {errorCase ? (
                <div className=''>
                    <p>
                        Произошла ошибка. Попробуйте обновить страницу или
                        вернуться позже
                    </p>
                    <p>Ошибка - {errorCase}</p>
                </div>
            ) : null}
        </div>
    );
};

export default MainPage;
