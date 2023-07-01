import React,{useEffect, useState, useRef, useCallback} from "react";
import {useRouter} from 'next/router'
import { Container } from "react-bootstrap";

import CardWrapper from '../../Common/Wrapper/Card/CardWrapper';
import PaginatedTable from "../../Common/Table/PaginatedTable";
import { applicationUrl } from "../../config/Config";
import AddUserButton from "./AddUserButton";


const CspUserBlock = (props)=>{

    const authToken = '';
    const router = useRouter()
    const theaderData = ['NAME', 'EMAIL-ID','MOBILE NUMBER', 'STATUS', 'PRIVILEDGE',''];
    
    const [cspUserList,setCspUserList] = useState();
    const [success, setSuccess] = useState('')
    const [error, setError] = useState()
    const [networkError, setNetworkError] = useState('')
    const [toggle, setToggle] = useState(0);
    const mountedUser = useRef(false);

    //CALL BLOCK-UNBLOCK API
    const blockUnblock = useCallback(async(data)=>{
        const BlockUnblockUsersApi = await fetch(
            applicationUrl+"/blockUnblockApi",
            {
                method : "POST",
                body: JSON.stringify({
                    adminUserid : data,
                    authToken : authToken
                })
            }
        )

        const statusData = await BlockUnblockUsersApi.json()
        const responseCode = statusData.responseCode

        if(responseCode === 200){
            const responseMessage = statusData.responseMessage;
            setSuccess(responseMessage)
            setToggle(true)

        }else if(responseCode === 401){
            const responseMessage = statusData.responseMessage
            setNetworkError(responseMessage);
            setError('');
        }else {
            const responseMessage = statusData.responseMessage
            setNetworkError('')
            setError(responseMessage)
        }
    });

    //CHANGE PRIVILEDGE API CALLING
    const changePriviledge = useCallback(async(data)=>{
        const privilageAdminUserApi = await fetch(
            applicationUrl+"/privilageAdminUser",
            {
                method : "POST",
                body: JSON.stringify({
                    adminUserid : data,
                    authToken : authToken
                })
            }
        )

        const statusData = await privilageAdminUserApi.json()
        const responseCode = statusData.responseCode

        if(responseCode === 200){
            const responseMessage = statusData.responseMessage;
            setSuccess(responseMessage)
            setToggle(true)

        }else if(responseCode === 401){
            const responseMessage = statusData.responseMessage
            setNetworkError(responseMessage);
            setError('');
        }else {
            const responseMessage = statusData.responseMessage
            setNetworkError('')
            setError(responseMessage)
        }
    })

    //CALL ALL USER LIST DATA
    const callAdminUserList = useCallback(async()=>{
        const userListData = await fetch(
            applicationUrl+"/userList",
            {
                method : "POST",
                body: JSON.stringify({
                    authToken: authToken
                })
            }
        )

        const userDetails = await userListData.json();
        const responseCode = userDetails.responseCode;

        if(responseCode === 200){
            const responseData = userDetails.responseData;
            setCspUserList(responseData);

        }else if(responseCode === 401){
            const responseMessage = userDetails.responseMessage
            setNetworkError(responseMessage);
            setError('');
            setCspUserList('')
        }else {
            const responseMessage = userDetails.responseMessage
            setNetworkError('')
            setCspUserList('')
            setError(responseMessage)
        }
    })

    //SCREEN EFFECT 
    useEffect(()=>{
        mountedUser.current = true;

        if(mountedUser){

            callAdminUserList()
        }
        return ()=>{
            mountedUser.current = false;
            setToggle(false)
        } 
    },[toggle]);

    if(typeof window !== 'undefined'){
        authToken = localStorage.getItem('authToken') ? localStorage.getItem('authToken') : '';
        if(!authToken){
            router.replace("login");
            return null
        }
    }

    if(success){
        setTimeout(()=>{
            setSuccess('')
        }, 3000);
    }

    if(networkError){
        props.onPageReload(networkError)
    }

    return(
        <Container>

            <AddUserButton/>

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

            {success && (
                <div className="alert alert-success d-flex align-items-center" role="alert">
                    <svg 
                        className="bi flex-shrink-0 me-2" 
                        width="24" 
                        height="24" 
                        role="img" 
                        aria-label="Success:">
                    </svg>
                    <div>
                        {success+" Successfully"}
                    </div>
                </div>
            )}

            {error && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <svg 
                        className="bi flex-shrink-0 me-2" 
                        width="24" 
                        height="24" 
                        role="img" 
                        aria-label="Danger:">
                    </svg>
                    <div>
                        {error}
                    </div>
                </div>
            )}

            <CardWrapper>
                {cspUserList ? (
                    <PaginatedTable 
                        tableList ={cspUserList} 
                        errorMessage = {error}
                        pageSize ={5} 
                        tableClass ="userTableRow" 
                        theader = {theaderData} 
                        isSuper={props.isSuper} 
                        onBlockUnBlock ={blockUnblock} 
                        onChangePriledge ={changePriviledge}
                    />

                ):(
                    <React.Fragment>
                        <PaginatedTable 
                            tableClass ="userTableRow" 
                            errorMessage = {error}
                            theader = {theaderData} 
                            isSuper={props.isSuper} 
                            onBlockUnBlock ={blockUnblock} 
                            onChangePriledge ={changePriviledge}
                        />
                    </React.Fragment>
                )}
            </CardWrapper>
        </Container>
    )
}

export default React.memo(CspUserBlock)