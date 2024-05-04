import React from "react";
import styles from './TopBar.module.css';

const TopBar = () =>{
    return(
        <div className={styles.mainContainer}>
            <img src='assets/wifi.png' width='25px' height='15px' />
            <img src='assets/sound.png' width='27px' height='17px' />
            <img src='assets/Battery.png' width='27px' height='16px' />
        </div>
    )
};

export default TopBar;