import React from 'react';
import styles from './ProductLogo.module.scss';

interface IProductLogo {
    url: string;
    name: string;
}

const ProductLogo = ({ url, name }: IProductLogo) => {
    return <img className={styles.productLogo} src={url} alt={name} />;
};

export default ProductLogo;
