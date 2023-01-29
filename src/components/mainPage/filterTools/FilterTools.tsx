import React, { useState } from 'react';
import styles from './FilterTools.module.scss';
import {
    filterBySearchString,
    setCurrentPage,
} from '../../../features/productSlice';
import { useAppDispatch } from '../../../hooks/useReduxHooks';
import LupeIcon from '../../../assets/icons/LupeIcon.js';

const FilterTools = () => {
    const dispatch = useAppDispatch();

    // стейт для инпута поиска
    const [searchInput, setSearchInput] = useState('');

    // функция запускает фильтрацию по строке при нажатии на Ентер
    function onKeyEnter(eventKey: string) {
        if (eventKey === 'Enter') {
            dispatch(filterBySearchString(searchInput));
            dispatch(setCurrentPage(1));
            setSearchInput('');
        }
    }

    return (
        <div className={styles.filterTools}>
            <span className={styles.filterTools__icon}>
                <LupeIcon />
            </span>

            <input
                className={styles.filterTools__input}
                type='text'
                placeholder='Поиск...'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => onKeyEnter(e.key)}
            />
        </div>
    );
};

export default FilterTools;
