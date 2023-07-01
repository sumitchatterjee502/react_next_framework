import React from 'react';
import Dashboard from '../../../../styles/DashboardStyle.module.css';

const TopBar = (props)=> {
    return (
        <div className={Dashboard.downloadBar}>
            {props.children}
        </div>
    )
}

export default React.memo(TopBar)