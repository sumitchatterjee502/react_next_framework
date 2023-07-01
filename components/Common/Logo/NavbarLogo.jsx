import React from 'react';
import Link from 'next/link';
import Image from 'next/image'

import paythroughlogoSmall from '../../../public/image/paythroughlogoSmall.png';
import paythroughlogo from '../../../public/image/paythroughlogo.png';

import ThemeStyle from '../../../styles/ThemeStyle.module.css';
import DashboardStyle from '../../../styles/DashboardStyle.module.css';
import {baseUrl} from '../../config/Config';

const NavbarLogo = (props)=>{
    return(
        <React.Fragment>
            <Link href={props.link}>
                <a className={ThemeStyle.navbarBrand+' '+ThemeStyle.dBlock+' '+ThemeStyle.dSmNone+' '+DashboardStyle.smallLogo}>
                    <Image
                        className={DashboardStyle.brandLogo}
                        src={paythroughlogoSmall} 
                        alt="logo" 
                    />
                </a>
            </Link>
            <Link href={props.link}>
                <a className={ThemeStyle.navbarBrand+' '+ThemeStyle.dNone+' '+ThemeStyle.dSmBlock}>
                    <Image
                        className={DashboardStyle.brandLogo}
                        src={paythroughlogo} 
                        alt="logo" 
                        width={180}
                        height={30}
                    />
                </a>
            </Link>
        </React.Fragment>
    )
}

export default React.memo(NavbarLogo)

