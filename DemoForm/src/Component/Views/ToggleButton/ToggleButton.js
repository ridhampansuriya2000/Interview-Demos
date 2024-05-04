import React from "react";

import style from './ToggleButton.module.css'

const ToggleButton = ({
    lables,
    activeLable,
   handleToggle
                      }) =>{
    return(
        <div className={style.toggleButton}>
            <div className={`${activeLable === lables[0] && style.activeTab}`}
                 onClick={()=>handleToggle(lables[0])}
            >
                {lables[0]}
            </div>
            <div className={`${activeLable === lables[1] && style.activeTab}`}
                 onClick={()=>handleToggle(lables[1])}
            >
                {lables[1]
                }</div>
        </div>
    )
}

export default ToggleButton;