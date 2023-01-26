import React from 'react';
import styles from './PageNavigation.module.scss';
import LeftArrow from '../../../assets/icons/LeftArrow';
import RightArrow from '../../../assets/icons/RightArrow';

interface IPageNavigationProps {
    nextPage: any;
    prevPage: any;
    page: any;
    setPage: any;
    totalPages: any;
}

const PageNavigation = ({
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
}: IPageNavigationProps) => {
    return (
        <div className={styles.pageNavigation}>
            <button className={styles.pageNavigation__btn} onClick={prevPage}>
                <LeftArrow />
            </button>

            {[...Array(totalPages).keys()].map((el) => (
                <button
                    onClick={() => setPage(el + 1)}
                    key={el}
                    className={`${styles.pageNavigation__btn} ${
                        page === el + 1 ? styles.pageNavigation__btn_active : ''
                    }`}
                >
                    {el + 1}
                </button>
            ))}
            <button className={styles.pageNavigation__btn} onClick={nextPage}>
                <RightArrow />
            </button>
        </div>
    );
};

export default PageNavigation;
