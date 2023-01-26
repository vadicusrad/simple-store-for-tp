import React from 'react';
import styles from './ProductList.module.scss';
import { Link } from 'react-router-dom';
import { IAdaptedProduct } from '../../../features/productSlice';
import { useAppSelector } from '../../../hooks/useReduxHooks';
import ListRow from './listRow/ListRow';

interface IProductList {
    firstContentIndex: number;
    lastContentIndex: number;
}

const ProductList = ({ firstContentIndex, lastContentIndex }: IProductList) => {
    const visibleProducts = useAppSelector(
        (state) => state.products.visibleProducts
    );
    return (
        <div className={styles.productList}>
            <ul className={styles.productList__head}>
                <li className={styles.productList__element}>Фото</li>
                <li className={styles.productList__element}>Название</li>
                <li className={styles.productList__element}>Просмотры</li>
                <li className={styles.productList__element}>Начало ротации</li>
                <li className={styles.productList__element}>Конец ротации</li>
            </ul>
            {visibleProducts
                .slice(firstContentIndex, lastContentIndex)
                .map((product: IAdaptedProduct) => (
                    <Link
                        className={styles.productList__link}
                        key={product.id}
                        to={`product-page/${product.id}`}
                    >
                        <ListRow {...product} />
                    </Link>
                ))}
        </div>
    );
};

export default ProductList;
