import React,{useState, useCallback} from 'react';
import {useRouter} from 'next/router'
import { useSelector } from 'react-redux';

import Head from "next/head";
import MainContentWrapper from '../components/Common/Wrapper/Content/MainContentWrapper'
import ContentBody from '../components/Common/Wrapper/Content/ContentBody'
import DownloadBar from '../components/Common/Headbar/DownloadBar';
import NavbarComponent from '../components/Common/Navbar/NavbarComponent';
import CspPendingBlock from '../components/Blocks/Pending/CspPendingBlock';

import Login from './login'

const PendingUser = ()=>{
    const store = useSelector(state => state);
    const router = useRouter()
    const [choosingDate, setChoosingDate] = useState('')
    const [error, setError] = useState('')

    const payloadAuthData = '';
    const isAuthanticate = '';

    if(typeof window !=="undefined"){
        payloadAuthData = localStorage.getItem('authData')
        isAuthanticate = localStorage.getItem('isAuthanticate') ? localStorage.getItem('isAuthanticate') : '';
        
        if(!isAuthanticate){
            router.replace("login")
            return null
        }
    }

    const parsePayloadData = payloadAuthData ? JSON.parse(payloadAuthData) : '';
    //const [parsePayloadData, setParsePayloadData] = useState(payloadData)

    const data = parsePayloadData; 

    const pendingCSPUserListPrivilege = data ? data.privilege.pendingCSPUserListPrivilege : "";
    const manageAdminUserPrivilege = data ? data.privilege.manageAdminUserPrivilege : "";
    const completeCSPUserListPrivilege = data ? data.privilege.completeCSPUserListPrivilege : "";
    const rejectCSPUserListPrivilege = data ? data.privilege.rejectCSPUserListPrivilege : "";

    const date = new Date();
    let text = date.toLocaleDateString();
    let dateSplit = text.split('/');

    var year = dateSplit[2];
    var month = dateSplit[1];
    var day = dateSplit[0];
    var dateFull = year+'-'+month+'-'+day;

    const getDateFromCalender = (data)=>{
        if(data){
            setChoosingDate(data)
        }else{
            setChoosingDate(dateFull)
        }
    }

    const pageReload=(data)=>{
        router.replace("login")
        return null
    }

    return(
        <MainContentWrapper>
            <Head>
                <meta name="description" content="Two Factor Authantication"/>
                <meta name="keywords" content="HTML, CSS, JavaScript"/>
                <meta name="author" content="Paythrough Software & Solution Pvt.Ltd"/>
                <link rel="shortcut icon" href="/image/favicon.png" type="image/x-icon"/>  
                <title>Csp On Boarding</title>
                <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            </Head>

            <ContentBody>

                <DownloadBar rejectCSPUserListPrivilege ={rejectCSPUserListPrivilege} completeCSPUserListPrivilege ={completeCSPUserListPrivilege}/>

                <NavbarComponent active = "sessionPending" manageAdminUserPrivilege ={manageAdminUserPrivilege} pendingCSPUserListPrivilege ={pendingCSPUserListPrivilege} onGetDate ={getDateFromCalender} passDate={dateFull}/>
                
                <CspPendingBlock sendChoosingDate ={choosingDate} passDefaultDate={dateFull} onPagereload ={pageReload}/>
            </ContentBody>
        </MainContentWrapper>
    )
}

export default PendingUser;