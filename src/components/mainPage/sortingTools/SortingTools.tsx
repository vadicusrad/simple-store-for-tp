import React, { useState } from 'react';
import styles from './SortingTools.module.scss';
import {
    reverseProductsArray,
    setCurrentSortCondition,
    sortProductsByCurrentSortCondition,
} from '../../../features/productSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxHooks';

const SortingTools = () => {
    const dispatch = useAppDispatch();
    // текущий установленный способ сортировки
    const currentSortCondition = useAppSelector(
        (state) => state.products.currentSortCondition
    );

    const [activeElement, setActiveElement] = useState('by-name');

    function handleSortProducts(select: string) {
        // если запрошенный способ сортироки совпадает с текущим - вызывается функция разворота массива
        if (select === currentSortCondition) {
            dispatch(reverseProductsArray());
            return;
        }
        // если запрошенный способ сортироки не совпадает с текущим - задается новый и затем выполняется
        dispatch(setCurrentSortCondition(select));
        dispatch(sortProductsByCurrentSortCondition());
        setActiveElement(select);
    }

    // function addActiveClassToSortElement(
    //     e: string | React.MouseEvent<HTMLLIElement, MouseEvent>
    // ) {
    //     console.log(e.target.parentElement);
    //     e.target.parentElement.forEach((item) => item.classRemove('active'));
    //     e.target.className = `${e.target.className}  active`;
    // }

    return (
        <div className={styles.sortingTools}>
            <span className={styles.sortingTools__selectName}>
                Сортировать:
            </span>
            <ul className={styles.sortingTools__list}>
                <li
                    className={`${styles.sortingTools__element} ${
                        activeElement === 'by-name'
                            ? styles.sortingTools__element_active
                            : null
                    }`}
                    onClick={(e) => handleSortProducts('by-name')}
                >
                    по названию
                </li>
                <li
                    className={`${styles.sortingTools__element} ${
                        activeElement === 'by-views'
                            ? styles.sortingTools__element_active
                            : null
                    }`}
                    onClick={(e) => handleSortProducts('by-views')}
                >
                    по просмотрам
                </li>
                <li
                    className={`${styles.sortingTools__element} ${
                        activeElement === 'by-start-date'
                            ? styles.sortingTools__element_active
                            : null
                    }`}
                    onClick={() => handleSortProducts('by-start-date')}
                >
                    по дате начала
                </li>
                <li
                    className={`${styles.sortingTools__element} ${
                        activeElement === 'by-end-date'
                            ? styles.sortingTools__element_active
                            : null
                    }`}
                    onClick={() => handleSortProducts('by-end-date')}
                >
                    по дате окончания
                </li>
            </ul>
        </div>
    );
};

export default SortingTools;
