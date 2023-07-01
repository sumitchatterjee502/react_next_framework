import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {doLogout} from '../../../redux/index';

import { Nav } from "react-bootstrap";

import ThemeStyle from '../../../styles/ThemeStyle.module.css'

const Logout = ()=>{
    const router = useRouter();
    const dispatch = useDispatch();


    const logout =()=>{
        if(typeof window !== "undefined"){
            localStorage.clear()
            dispatch(doLogout())
            router.push("/")
        }
    }

    return (
        <Nav>
            <Nav.Link href={'#'} role = 'button' className = {ThemeStyle.logOutNavLink} onClick={logout}>
                <i className = "fas fa-power-off"></i>
            </Nav.Link>
        </Nav>
    )

}

export default Logout;