import React,{useState, useEffect, useRef, useCallback} from 'react';
import {useRouter} from 'next/router'
import { Container } from 'react-bootstrap';
import { applicationUrl } from '../../config/Config';

import ProcessPendingTableList from '../../Common/Table/ProcessPendingTableList';
import CardWrapper from '../../Common/Wrapper/Card/CardWrapper';
import CustomCard from '../../Common/Wrapper/Card/CustomCard';

const ProcessPendingBlock = (props)=>{

    const authToken = '';
    const router = useRouter();
    const mountedCsp = useRef(false);
    const [processPendingUserList, setProcessPendingUserList] = useState('');
    const [error, setError] = useState('')
    const [networkError, setNetworkError] = useState('')
    const [checkStatus, setCheckStatus] = useState('');

    const chosingDate = props.sendChoosingDate ?  props.sendChoosingDate : props.passDefaultDate;

    const theaderData = ['CREATED AT','NAME', 'MOBILE NUMBER', 'OTP VALIDATE', 'RURN', 'BIO KYC', 'REQUIRY', 'CSP ONBOARDING', 'AGENT-CONSENT-STATUS'];

    const callProcessPendingBlock = useCallback(async()=>{
        const processPendingListData = await fetch(
            applicationUrl+"/processPendingListApi",
            {
                method: "POST",
                body : JSON.stringify({
                    chosingDate: chosingDate,
                    authToken : authToken
                })
            }
        )

        const processDataList = await processPendingListData.json();
        const responseCode = processDataList.responseCode
        if(responseCode === 200){
            const responseData = processDataList.responseData;
            setProcessPendingUserList(responseData);

        }else if(responseCode === 401){
            const responseMessage = processDataList.responseMessage
            setNetworkError(responseMessage);
            setError('');
            setProcessPendingUserList('')
        }else {
            const responseMessage = processDataList.responseMessage
            setNetworkError('')
            setProcessPendingUserList('')
            setError(responseMessage)
        }
    })

    useEffect(()=>{
        mountedCsp.current = true;
        if(mountedCsp){
            
            callProcessPendingBlock();
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

    //Page Reload
    if(networkError){
        props.onPageReload(networkError)
    }

    return (
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
                    {processPendingUserList ? (
                        <ProcessPendingTableList errorMessage = {error} tableList ={processPendingUserList} pageSize ={5} theader = {theaderData} tableClass = "pending_table"/>
                    ):(
                        <ProcessPendingTableList errorMessage = {error} tableList ={''} theader = {theaderData} tableClass = "pending_table"/>
                    )}
                </CustomCard>
            </CardWrapper>
        </Container>
    )

}

export default React.memo(ProcessPendingBlock)