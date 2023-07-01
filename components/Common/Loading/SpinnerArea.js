import React from "react";

import loaderStyle from '../../../styles/Loader.module.css';

export default function SpinnerArea(){
    return(
        <div className={loaderStyle.container}>
            <div className={loaderStyle.loader7}></div>
        </div>
    )
}