import React, { useEffect } from 'react';
import styles from './ProductPage.module.scss';
import { useHistory, useParams } from 'react-router-dom';
import { getSingleProduct } from '../../features/productSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks';
import LeftArrow from '../../assets/icons/LeftArrow';
import DiscountIcon from '../../assets/icons/DiscountIcon';
import DiscountBadge from './discountBadge/DiscountBadge';
import ProductLogo from './productLogo/PoductLogo';
import RatingStars from './ratingStars/RatingStars';
import Prices from './prices/Prices';
import Disclaimer from './disclaimer/Disclaimer';

interface IParams {
    id: string;
}

const ProductPage = () => {
    const dispatch = useAppDispatch();
    const currentProduct = useAppSelector(
        (state) => state.products.currentProduct
    );
    const { id }: IParams = useParams();

    useEffect(() => {
        dispatch(getSingleProduct(id));
    }, [id]);

    const history = useHistory();

    function handleGoBack() {
        history.goBack();
    }

    if (currentProduct) {
        return (
            <div className={styles.productPage}>
                <div className={styles.productPage__card}>
                    <button
                        className={styles.productPage__backBtn}
                        onClick={handleGoBack}
                    >
                        <LeftArrow /> <span>Назад</span>
                    </button>
                    {+currentProduct.discount ? (
                        <DiscountBadge value={currentProduct.discount} />
                    ) : null}
                    <ProductLogo
                        url={currentProduct.logo_url}
                        name={currentProduct.name}
                    />
                    <div className={styles.productPage__wrapper}>
                        <img
                            className={styles.productPage__image}
                            src={currentProduct.image_url}
                            alt={currentProduct.name}
                        />
                        <div className={styles.productPage__info}>
                            <h1 className={styles.productPage__info_name}>
                                {currentProduct.name}
                            </h1>
                            <RatingStars stars={Number(currentProduct.stars)} />
                            <Prices currentProduct={currentProduct} />
                        </div>
                    </div>
                    {currentProduct.disclaimer ? (
                        <Disclaimer text={currentProduct.disclaimer} />
                    ) : null}
                </div>
            </div>
        );
    }

    return <p>Продукт не найден</p>;
};

export default ProductPage;
