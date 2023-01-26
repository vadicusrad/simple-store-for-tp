import React from 'react';
import styles from './Disclaimer.module.scss';

interface IDisclaimer {
    text: string;
}

function Disclaimer({ text }: IDisclaimer): JSX.Element {
    return <div className={styles.disclaimer}>{text}</div>;
}

export default Disclaimer;
