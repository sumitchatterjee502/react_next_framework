import React,{useEffect, useState} from 'react'

import NavbarLogo from '../Logo/NavbarLogo'
import NavbarWrapper from '../Wrapper/Navbar/NavbarWrapper';
import NavMenu from '../ListItem/Navbar/NavMenu';

import { baseUrl } from '../../config/Config';
import NavbarItem from '../ListItem/Navbar/NavbarItem';

const NavbarComponent = (props)=> {

    const [menuList, setMenuList] = useState([]);

    useEffect(()=>{
        setMenuList([
            {
                menuName : "Session-Pending",
                menuLink : baseUrl+'/pending-user',
                isActive: props.active === "sessionPending" ? 1  : 0,
                isMenuActive : "ALLOW",
                isFromShow: true
            }, {
                menuName : "Process-Pending",
                menuLink : baseUrl+"/process-pending-user",
                isActive: props.active === "processPending" ? 1  : 0,
                isMenuActive : "ALLOW",
                isFromShow: true
            },
            {
                menuName : "User",
                menuLink : baseUrl+"/users",
                isActive: props.active === "user" ? 1  : 0,
                isMenuActive : "ALLOW",
                isFromShow: false
            }
        ])
    },[])
  

    return(
        <NavbarWrapper>
            <NavbarLogo link ="#"/>

            <NavMenu menuListItem = {menuList}/>
            <NavbarItem navData ={props} onGetDate ={props.onGetDate} passDate ={props.passDate}/>

        </NavbarWrapper>
    )
}

export default React.memo(NavbarComponent)