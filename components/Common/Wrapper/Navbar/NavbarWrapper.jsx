import React from "react";
import {Navbar} from 'react-bootstrap'
import ThemeStyle from '../../../../styles/ThemeStyle.module.css';

const NavbarWrapper = (props)=>{
    return(
        <Navbar bg = "loght" expand ="lg" className={ThemeStyle.navbar+' '+ThemeStyle.navbarExpand+' mb-4'}>
            {props.children}
        </Navbar>
    )
}

export default React.memo(NavbarWrapper)