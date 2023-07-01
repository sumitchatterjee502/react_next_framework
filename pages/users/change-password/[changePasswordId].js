import React,{useState} from 'react';
import { useRouter } from "next/router";
import { Container } from 'react-bootstrap';

import Head from "next/head";
import MainContentWrapper from '../../../components/Common/Wrapper/Content/MainContentWrapper';
import ContentBody from '../../../components/Common/Wrapper/Content/ContentBody';
import DownloadBar from '../../../components/Common/Headbar/DownloadBar';
import NavbarComponent from '../../../components/Common/Navbar/NavbarComponent';
import ChangePasswordBlock from '../../../components/Blocks/User/ChangePasswordBlock';

const ChangePassword = (props)=>{

    const router = useRouter();
    const [error, setError] = useState('')
    const changePasswordId = router.query.changePasswordId

    const payloadAuthData = '';

    if(typeof window !=="undefined"){
        payloadAuthData = localStorage.getItem('authData')
        const isAuthanticate = localStorage.getItem('isAuthanticate') ? localStorage.getItem('isAuthanticate') : '';
        if(!isAuthanticate){
            router.replace("/login");
            return null
        }
    }

    const parsePayloadData = payloadAuthData ? JSON.parse(payloadAuthData) : '';
   // const [parsePayloadData, setParsePayloadData] = useState(payloadData)

    const data = parsePayloadData; 

    const pendingCSPUserListPrivilege = data ? data.privilege.pendingCSPUserListPrivilege : "";
    const manageAdminUserPrivilege = data ? data.privilege.manageAdminUserPrivilege : "";
    const completeCSPUserListPrivilege = data ? data.privilege.completeCSPUserListPrivilege : "";
    const rejectCSPUserListPrivilege = data ? data.privilege.rejectCSPUserListPrivilege : "";

    const isSuper = data ? data.isSuper : "0";

    const pageReload = (data)=>{
        router.replace("login");
        return null
    }
    
    return(
        <MainContentWrapper theme ="ChangePwd">
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
                

                <NavbarComponent active = "user" manageAdminUserPrivilege ={manageAdminUserPrivilege} pendingCSPUserListPrivilege ={pendingCSPUserListPrivilege}/>

                <Container>
                    <ChangePasswordBlock listUserId ={changePasswordId} onPageReload = {pageReload}/>
                </Container>

            </ContentBody>
        </MainContentWrapper>
    )
}

export default ChangePassword;