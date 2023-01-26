import styles from './RatingStars.module.scss';
import { Rating } from '@mui/material';
import React from 'react';

interface IRatingStars {
    stars: number;
}

const RatingStars = ({ stars }: IRatingStars) => {
    return (
        <div className={styles.stars}>
            <Rating
                name='rating-stars'
                size='large'
                value={stars}
                readOnly
                sx={{ color: '#344050', borderRadius: '10px' }}
            />
        </div>
    );
};

export default RatingStars;
