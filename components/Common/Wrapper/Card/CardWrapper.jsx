import React from "react";
import ThemeStyle from '../../../../styles/ThemeStyle.module.css';

const CardWrapper = (props)=>{
    return(
        <div className={ThemeStyle.card+' '+ThemeStyle.shadow}>
            {props.children}
        </div>
    )
}

export default React.memo(CardWrapper)