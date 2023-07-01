import React from 'react';
import Link from 'next/link';
import DashBoardStyle from '../../../../styles/DashboardStyle.module.css';
import ThemeStyle from '../../../../styles/ThemeStyle.module.css'

const DownloadListBar = (props)=> {

    const clickEventData = (data)=>{
        props.onFetchDataDownloadList(data);
    }
    
    return (
        <ul className={DashBoardStyle.downloadBarUl}>
            {
                props.downloadList.map((data, i) =>(
                    <li key={i} className={DashBoardStyle.downloadBarUlLi+ ' '+ThemeStyle.navItem+' '+ThemeStyle.mx1} title={data.name} style ={{display : data.isMenuActive == "ALLOW" ? "show" : "none"}}>
                        <Link  href={'#'}>
                            <a className={DashBoardStyle.downloadBarUlLiA+' '+ThemeStyle.navLink+' '+DashBoardStyle.export} id="alertsDropdown" role="button" onClick={()=> clickEventData(data.clickEventData)}><i className={data.icon}></i>{data.name}</a>
                        </Link>
                    </li>
                ))
            }
        </ul>
    )
}

export default React.memo(DownloadListBar)
