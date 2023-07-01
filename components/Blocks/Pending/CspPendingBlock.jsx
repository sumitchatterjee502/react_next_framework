import React,{useState, useEffect, useRef, useCallback} from "react";
import {useRouter} from 'next/router'
import { Container } from "react-bootstrap";

import PaginatePendingTableList from "../../Common/Table/PaginatePendingTableList";
import CardWrapper from '../../Common/Wrapper/Card/CardWrapper';
import CustomCard from "../../Common/Wrapper/Card/CustomCard";

import { applicationUrl } from "../../config/Config";

const CspPendingBlock = (props)=>{

    const authToken = '';
    const router = useRouter();
    const mountedCsp = useRef(false);
    const [cspOnPendingUserList, setCspOnPendingUserList] = useState('');
    const [error, setError] = useState('')
    const [networkError, setNetworkError] = useState('');
    const chosingDate = props.sendChoosingDate ?  props.sendChoosingDate : props.passDefaultDate;

    const theaderData = ['NAME', 'MOBILE NUMBER', 'PAY ID', 'OTP VALIDATE', 'RURN', 'BIO KYC', 'REQUIRY', 'CSP ONBOARDING', 'REMARKS', 'STATUS', ''];


    const callPendingList = useCallback(async ()=>{
        const cspPendingData = await fetch(
            applicationUrl+'/cspPendingUserApi',
            {
                method: "POST",
                body : JSON.stringify({
                    chosingDate: chosingDate,
                    authToken : authToken
                })
            }
        )

        const listData = await cspPendingData.json()
        const responseCode = listData.responseCode
        if(responseCode === 200){
            const responseData = listData.responseData;
            setCspOnPendingUserList(responseData);

        }else if(responseCode === 401){
            const responseMessage = listData.responseMessage
            setNetworkError(responseMessage);
            setError('');
            setCspOnPendingUserList('')
        }else {
            const responseMessage = listData.responseMessage
            setNetworkError('')
            setCspOnPendingUserList('')
            setError(responseMessage)
        }
    });

    useEffect(()=>{
        mountedCsp.current = true;
        if(mountedCsp){
            
            callPendingList();
        }
        
        return ()=>{
            mountedCsp.current = false;
        }
    },[chosingDate]);
    
    if(typeof window !== 'undefined'){
        authToken = localStorage.getItem('authToken') ? localStorage.getItem('authToken') : '';
        if(!authToken){
            router.replace("login")
            return null
        }
    }

    //page Reload
    if(networkError){
        props.onPagereload(networkError)
    }

    return(
        <Container fluid>
            <CardWrapper>

                {networkError && (
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <svg 
                            className="bi flex-shrink-0 me-2" 
                            width="24" 
                            height="24" 
                            role="img" 
                            aria-label="Danger:">
                        </svg>
                        <div>
                            {networkError}
                        </div>
                    </div>
                )}
                <CustomCard>
                {
                    cspOnPendingUserList ? (
                        <PaginatePendingTableList errorMessage = {error} tableList ={cspOnPendingUserList} pageSize ={5} theader = {theaderData} tableClass = "pending_table"/>
                    ):(
                        <PaginatePendingTableList errorMessage = {error} tableList ={''} theader = {theaderData} tableClass = "pending_table" onCheck ={''}/>
                    )
                }
                </CustomCard>
            </CardWrapper>
        </Container>
    )
}

export default React.memo(CspPendingBlock);