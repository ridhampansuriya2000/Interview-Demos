import React from "react";
import styles from './AppsBar.module.css';

const AppsBar = () =>{
    return(
        <div className={styles.mainContainer} item='contextDisable'>
            <div className={styles.appBox} item='contextDisable'>
                <img src='assets/Diary.png' width='60px' height='60px' item='contextDisable' />
                <img src='assets/Calender.png' width='60px' height='60px' item='contextDisable' />
                <img src='assets/Google Chrome.png' width='60px' height='60px' item='contextDisable' />
                <img src='assets/Empty Bin.png' width='60px' height='60px' item='contextDisable' />
            </div>
        </div>
    )
};

export default AppsBar;