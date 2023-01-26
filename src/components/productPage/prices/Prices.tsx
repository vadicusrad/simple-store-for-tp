import React from 'react';
import RubleIcon from '../../../assets/icons/RubleIcon';
import { IAdaptedProduct } from '../../../features/productSlice';
import styles from './Prices.module.scss';

interface IPrices {
    currentProduct: IAdaptedProduct;
}

const Prices = ({ currentProduct }: IPrices) => {
    function formatPrice(price: string | number | undefined) {
        if (price) {
            price = price + '';
            let priceArr;

            // можно позже перделать на замену всех запятых в строке на точки через replace()
            // пока пусть так
            if (price.includes('.')) {
                priceArr = price.split('.');
            } else {
                priceArr = price.split(',');
            }

            let majorPrice = priceArr[0];
            let minorPrice = priceArr[1];

            return (
                <>
                    <span>{majorPrice}</span>
                    <span>{minorPrice}</span>
                </>
            );
        }
    }

    return (
        <div className={styles.prices}>
            <>
                {currentProduct.new_price ? (
                    <div>
                        <span className={styles.prices__oldPriceValue}>
                            {formatPrice(currentProduct.old_price)}
                            <RubleIcon color='#94979C' width={29} height={28} />
                        </span>
                        <p className={styles.prices__text}>СТАРАЯ ЦЕНА</p>
                    </div>
                ) : null}
            </>
            <div className={styles.prices__newPrice}>
                <span className={styles.prices__newPriceValue}>
                    {currentProduct.new_price ? (
                        <>{formatPrice(currentProduct.new_price)}</>
                    ) : (
                        <>{formatPrice(currentProduct.old_price)}</>
                    )}

                    <RubleIcon color='#344050' width={40} height={44} />
                </span>

                {currentProduct.new_price ? (
                    <p className={styles.prices__text}>ЦЕНА ПО АКЦИИ</p>
                ) : null}
            </div>
        </div>
    );
};

export default Prices;
