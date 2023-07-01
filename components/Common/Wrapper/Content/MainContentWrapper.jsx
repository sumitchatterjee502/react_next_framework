import React from 'react'
import ThemeStyle from '../../../../styles/ThemeStyle.module.css'
import DashboardStyle from '../../../../styles/DashboardStyle.module.css'
import ChangePwdStyle from '../../../../styles/ChangePwd.module.css'


const MainContentWrapper = (props)=>{

    if(props.theme === "ChangePwd"){
        return (
            <div id='content-wrapper' className={ChangePwdStyle.body+' '+ThemeStyle.dflex+' '+ThemeStyle.flexcolumn}>
                {props.children}
            </div>
        )
    }else {
        return (
            <div id='content-wrapper' className={DashboardStyle.body+' '+ThemeStyle.dflex+' '+ThemeStyle.flexcolumn}>
                {props.children}
            </div>
        )
    }
}

export default React.memo(MainContentWrapper)