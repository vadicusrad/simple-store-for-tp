import React from 'react';
import styles from './DiscountBadge.module.scss';
import DiscountIcon from '../../../assets/icons/DiscountIcon';

interface IDiscountBadge {
    value: string | null;
}

const DiscountBadge = ({ value }: IDiscountBadge) => {
    return (
        <div className={styles.discountBadge}>
            <DiscountIcon />
            <span className={styles.discountBadge__value}>-{value}%</span>
        </div>
    );
};

export default DiscountBadge;
