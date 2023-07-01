import { Container } from "react-bootstrap";
import LoginStyle from '../styles/Login.module.css'

import Head from "next/head";
import Logo from "../components/Common/Logo/Logo";
import Wrapper from '../components/Common/Wrapper/Content/Wrapper'
import HeaderWrapper from '../components/Common/Wrapper/Content/HeaderWrapper'
import LoginBlock from '../components/Blocks/Login/LoginBlock';
import LoginForm from '../components/Forms/LoginForm'

const Login =()=>{
        
    return(
        <Container fluid className={LoginStyle.body}>
            <Head>
                <meta name="description" content="Kyc On Boarding "/>
                <meta name="keywords" content="HTML, CSS, JavaScript"/>
                <meta name="author" content="Paythrough Software & Solution Pvt.Ltd"/>
                <title>Csp On Boarding</title>
                <link rel="shortcut icon" href="/image/favicon.png" type="image/x-icon"/>  
                <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            </Head>

            <Wrapper wrapper = {LoginStyle.wraper}>

                <Logo/>

                <HeaderWrapper headerWraper = {LoginStyle.headerWraper} header = {LoginStyle.header}>
                    <h1 className={LoginStyle.headerh1}>
                        CSP ONBOARDING<br></br>
                        <span className={LoginStyle.admin}>ADMIN</span>
                    </h1>
                </HeaderWrapper>

                <LoginBlock>
                    <LoginForm/>
                </LoginBlock>

            </Wrapper>
        </Container>
        
    )
}

export default Login