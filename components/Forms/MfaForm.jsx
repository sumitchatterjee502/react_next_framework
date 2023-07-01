import React,{useState, useCallback, useEffect} from 'react'
import ReCaptchaV2 from 'react-google-recaptcha'
import {useRouter} from 'next/router'

import { Button, Form } from 'react-bootstrap';
import LoginStyle from '../../styles/Login.module.css'

import { InputNumber } from '../Lib/Validator/FormValidator';
import {recaptchaKey, applicationUrl, baseUrl} from '../config/Config'

const MfaForm = (props)=>{
    const [error, setError] = useState("");
    const [networkError, setNetworkError] = useState();
    const router = useRouter()
    
    const [responseData, setResponseData] = useState('');
    const [captchaToken, setCapthaToken] = useState('');

    //Effect on the ui after from submit
    useEffect(()=>{
        if(responseData){

            if(responseData.responseCode === 200){
                const newAuthToken = responseData.newAuthToken ? responseData.newAuthToken : '';
            
                if(typeof window !== "undefined"){

                    localStorage.setItem('authToken', newAuthToken);
                    localStorage.removeItem('doRedirect');
                    router.push(baseUrl+"/pending-user")
                }

            }else if(responseData.responseCode === 401){
                const errorMessage = responseData.responseMessage
                setNetworkError(errorMessage)
            } else {
                const errorMessage = responseData.responseMessage
                setError(errorMessage)
            }
        }

        return ()=>{
            setTimeout(()=>{
                setError('')
            }, 5 * 1000)
        }
    },[responseData]);


    if(typeof window !=="undefined"){
        const doRedirect = localStorage.getItem("doRedirect") === "1" ? localStorage.getItem("doRedirect") : ""
        const authToken = localStorage.getItem('authToken') ?  localStorage.getItem('authToken') : '';
        const token = authToken ? 'Bearer '+authToken : ''

        if(!doRedirect){
            router.replace("login")
            return null
        }
    }
    
    const {
        value: enteredDigit,
        isValid: enteredDigitIsValid,
        hasError : digitInputHasError,
        classes: digitInputClasses,
        valueChangeHandler: digitChangeHandler,
        inputBlurHandler : digitBlurHandler,
        reset: resetDigitInput,
        msg: errorDigitMessage
    } = InputNumber( value => value.trim() !== ''); 

    
    //VERIFY PIN SUBMIT
    const verifySecrectCode = async (e)=>{
        e.preventDefault()
        
        const getCode = enteredDigit;

        //CALLING API
        const callVerifyPinApi = await fetch(
            applicationUrl+"/verifyPin",
            {
                method : "POST",
                body: JSON.stringify({
                    secretPin : getCode, 
                    captchaToken: captchaToken,
                    token : token
                })
            }
        )
        const apiData = await callVerifyPinApi.json()    
        setResponseData(apiData)
    };

    //GET CAPTHA TOKEN
    const handleToken = (token) => {
        setCapthaToken(token)
    
    }

    //IF TOKEN IS EXPIRE
    if(networkError){
        router.replace("login");
        return null
    }

    return (
        <div className={LoginStyle.formWraper}>

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
            
            <form onSubmit={verifySecrectCode}>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>SECRET-CODE</Form.Label>

                    <Form.Control
                        type="password" 
                        placeholder="6 Digit Code" 
                        className={LoginStyle.formControl}
                        onChange ={digitChangeHandler}
                        onBlur ={digitBlurHandler}
                        value={enteredDigit}
                    />
                    {digitInputHasError && errorDigitMessage('Only digit Accepted')}
                </Form.Group>

                <div className={LoginStyle.formControl}>
                    <ReCaptchaV2 sitekey={recaptchaKey} onChange={handleToken}/>
                </div>

                <div className="d-grid">

                        <Button
                        type="submit" 
                        variant="primary" 
                        size="lg"
                    >
                        Go To Dashboard
                    </Button>
                    
                </div>
            </form>            
        </div>
    )
}

export default MfaForm;