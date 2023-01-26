import styles from './PageNotFound.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className={styles.pageNotfound}>
            <h1 className={styles.pageNotfound__header}>
                Упс! Страница не найдена.
            </h1>
            <p className={styles.pageNotfound__text}>
                Возможно вы ввели неправльный адрес.
            </p>
            <Link className={styles.pageNotfound__link} to='/'>
                Вернуться на главную
            </Link>
        </div>
    );
};

export default PageNotFound;
