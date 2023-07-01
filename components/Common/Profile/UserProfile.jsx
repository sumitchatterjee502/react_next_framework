import React from "react";
import {useRouter} from "next/router";
import { Button } from "react-bootstrap";

import undrawProfile from '../../../public/image/undraw_profile.svg';
import DashboardStyle from '../../../styles/DashboardStyle.module.css';
import UserProfileStyle from '../../../styles/UserProfile.module.css'

const UserProfile = (props)=>{

    const router = useRouter()
    const profileData = props.profileData ? JSON.parse(props.profileData) : ''

    const redirectPage = ()=>{
        router.push('/admin-change-password')
    }

    return(
        <ul className={UserProfileStyle.dropdownMenu+' '+UserProfileStyle.shadow+ ' '+props.isShow} aria-labelledby="dropdownMenuLink" style={{display: `${props.isShow ? "block":"none"}`}}>
            <li>
                <div className={UserProfileStyle.userDetails}>
                    <div className={DashboardStyle.formWraper}>
                        <div className={UserProfileStyle.profileIconWraper}>
                            <img 
                                className="img-profile rounded-circle" 
                                src={undrawProfile.src}
                                alt='profile'    
                            />
                        </div>
                        <div className={UserProfileStyle.userHead+ ' '+UserProfileStyle.mt3}>
                            <h1 className={UserProfileStyle.details+' text-center'}></h1>
                            <h6 className={UserProfileStyle.heading+' text-center'}>{profileData.name}</h6>
                        </div>
                        <div className={UserProfileStyle.divider+' mb-3'}></div>
                        <div className={UserProfileStyle.description}>
                            <div className={DashboardStyle.userDetails}>
                                <h6 className={DashboardStyle.heading}>Mobile Number</h6>
                                <h1 className={DashboardStyle.details}>{profileData.mobileNumber}</h1>
                            </div>
                            <div className={DashboardStyle.userDetails}>
                                <h6 className={DashboardStyle.heading}>Email Address</h6>
                                <h1 className={DashboardStyle.details}>{profileData.emailAddress}</h1>
                            </div>
                            <div className={DashboardStyle.userDetails}>
                                <h6 className={DashboardStyle.heading}>Privilege</h6>
                                <h1 className={DashboardStyle.details}>{profileData.privilegeStatus}</h1>
                            </div>
                        </div>
                        <div className={UserProfileStyle.divider+' mb-3'}></div>
                        <Button 
                            className={UserProfileStyle.btnOutlineDark+' '+UserProfileStyle.userChangePassword} 
                            type="button" 
                            onClick={redirectPage}
                        >
                            Change Password
                        </Button>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default React.memo(UserProfile);