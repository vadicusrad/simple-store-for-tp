import React from 'react';
import { IAdaptedProduct } from '../../../../features/productSlice';
import styles from './ListRow.module.scss';

const ListRow = (product: IAdaptedProduct) => {
    const {
        image_url,
        name,
        disclaimer,
        category,
        start_date,
        end_date,
        views,
    } = product;

    // функция для приведения даты в формат как в макете
    function formatDate(dateStr: string) {
        let dateArray = dateStr.split('/');
        let formatedDateArray = dateArray.map((item) => {
            if (item.length < 2) {
                let a = `0${item}`;
                item = a;
                return item;
            }
            return item;
        });

        formatedDateArray = [
            formatedDateArray[1],
            formatedDateArray[0],
            formatedDateArray[2],
        ];

        let formatedDate = formatedDateArray.join('.');
        return formatedDate;
    }

    return (
        <div className={styles.listRow}>
            <img className={styles.listRow__img} src={image_url} alt={name} />
            <span className={styles.listRow__desc}>
                <h2 className={styles.listRow__name}>{name}</h2>
                <p className={styles.listRow__category}>{category}</p>
            </span>
            <span className={styles.listRow__views}>{views}</span>

            <span className={styles.listRow__dates}>
                {formatDate(start_date)}
            </span>
            <span className={styles.listRow__dates}>
                {formatDate(end_date)}
            </span>
        </div>
    );
};

export default ListRow;
