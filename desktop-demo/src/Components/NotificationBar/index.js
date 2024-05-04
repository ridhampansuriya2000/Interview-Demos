import React from "react";
import styles from './NotificationBar.module.css';

const NotificationBar = () =>{
    return(
        <div className={styles.mainContainer} item='contextDisable'>
            <div className={styles.fileButton}>File</div>
            <div><img src='assets/logo.png' /></div>
        </div>
    )
};

export default NotificationBar;