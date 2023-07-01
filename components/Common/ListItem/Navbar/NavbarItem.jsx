import React, {useState, useEffect, useCallback} from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import Link from 'next/link';

import ThemeStyle from '../../../../styles/ThemeStyle.module.css';
import undrawProfile from '../../../../public/image/undraw_profile.svg'
import UserProfile from '../../Profile/UserProfile';
import Logout from '../../Logout/Logout';

import {applicationUrl} from '../../../config/Config';

const NavbarItem = (props)=>{

    const [btnToggle, setBtnToggle] = useState('');
    const [userProfile, setUserProfile] = useState();
    const [error, setError] = useState('')
    const [networkError, setNetworkError] = useState('')
    const [startDate, setStartDate] = useState('');
    const [dateFull, setDateFull] = useState();
    const [status, setStatus] = useState(false);
    const localData = '';
    const authToken = ''

    if(typeof window !== "undefined"){
        localData = localStorage.getItem('profileData') ? localStorage.getItem('profileData') : '';
        authToken = localStorage.getItem('authToken') ? localStorage.getItem('authToken') : '';
    }

    const dateCreate = useCallback((e)=>{

        if(e.target.value){
            const dateValue = e.target.value;
            setStartDate(e.target.value);
            props.onGetDate(dateValue); //LIFT UP PROPERTY VALUE
            setStatus(true)
        }else{
            const dateValue = dateFull;
            setStartDate('');
            props.onGetDate(dateValue) //LIFT UP PROPERTY VALUE
            setStatus(false)
        }
    })

    useEffect(async ()=>{
        
        if(!localData){

            const profileTempData = await fetch(
                applicationUrl+'/userProfileApi',
                {
                    method : "POST",
                    body : JSON.stringify({
                        authToken : authToken
                    })
                }
            )

            const apiData = await profileTempData.json()

            const responseCode = apiData.responseCode

            if(responseCode === 200){
                setUserProfile(JSON.stringify(apiData.responseData))
                localStorage.setItem('profileData', JSON.stringify(apiData.responseData))

            }else if(responseCode === 401){
                setError(apiData)
            }else {
                setNetworkError(apiData)
            }

        } else {
            setUserProfile(localData)
            setError('')
            setNetworkError('')
        }   
    },[btnToggle])

    const toggle = ()=>{
  
        if(!btnToggle){
            setBtnToggle('show')
        }else {
            setBtnToggle('')
        }
    }

    const toogleOff = ()=>{
        setBtnToggle('')
    }

    return (
        <ul className='  ml-auto navbar-nav'>
            <InputGroup style = {{visibility: props.navData.active === "sessionPending" || props.navData.active === "processPending"? '':'hidden'}}>
                <FormControl
                    type='date'
                    onChange = {dateCreate}
                    value = {status ? startDate : props.passDate}
                />
            </InputGroup>

            <div className={ThemeStyle.topbarDivider+' '+ThemeStyle.dNone+' '+ThemeStyle.dSmBlock}></div>
            <li className='nav-item'>
                
                <div className='btn-group'>
                    <Link 
                        className={`btn dropdown-toggle ${btnToggle ? 'show' : ''}`} 
                        role='button' 
                        id='dropdownMenuLink' 
                        data-bs-toggle="dropdown" 
                        aria-expanded={btnToggle? "true" : "false"} 
                        
                        href={'#'}
                        passHref
                    >
                        <img 
                            className={`${ThemeStyle.imgProfile} rounded-circle`} 
                            src={undrawProfile.src}
                            alt='small-profile'
                            onClick={toggle}
                        />
                    </Link>
                    
                    <UserProfile isShow={btnToggle} profileData = {userProfile}/>

                </div>
            </li>
            <Logout/>
        </ul>
    )
}

export default React.memo(NavbarItem)