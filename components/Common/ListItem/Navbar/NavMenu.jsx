import React from 'react';
import { Nav } from 'react-bootstrap';
import Link from 'next/link';

import ThemeStyle from '../../../../styles/ThemeStyle.module.css';

const NavMenu = (props)=>{

    return(
        <Nav className={ThemeStyle.navbarNav+' '+ThemeStyle.w100+' '+ThemeStyle.justifyContentCenter}>
            {
                props.menuListItem.map((data, i)=>(
                    <Nav.Item key={i}>
                        <Link href={data.menuLink}>
                            <a className={`nav-link ${data.isActive ? ThemeStyle.active+' ' : ''} ${ThemeStyle.ANavLink}`} style ={{display : data.isMenuActive === "ALLOW" ? "" : "none"}}>
                                {data.menuName}
                            </a>
                        </Link>
                    </Nav.Item>
                ))
            }
        </Nav>
    )
}

export default React.memo(NavMenu)