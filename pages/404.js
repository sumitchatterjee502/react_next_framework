import React from "react";
import Page404 from "../components/Blocks/Error/Page404";

import PageNotFoundStyle from '../styles/Page404.module.css';

const PageNotFound = ()=>{
    return(
        <section className={PageNotFoundStyle.page_404}>
            <Page404/>
        </section>
    )
}

export default PageNotFound