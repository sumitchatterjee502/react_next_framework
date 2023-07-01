import React from "react";
import ThemeStyle from '../../../../styles/ThemeStyle.module.css';

const CustomCard = (props)=>{
    return(
        <div className={ThemeStyle.castomCard}>
            {props.children}
        </div>
    )
}

export default React.memo(CustomCard)