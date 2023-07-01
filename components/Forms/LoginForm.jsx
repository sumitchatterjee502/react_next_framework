import React,{useCallback, useState, useEffect, useRef} from 'react';
import {useRouter} from 'next/router'
import ReCaptchaV2 from 'react-google-recaptcha'

import { useDispatch} from 'react-redux';
import {doLogin, doLogout} from '../../redux/index'

import { Form, Button } from 'react-bootstrap';
import LoginStyle from '../../styles/Login.module.css'

import { EmailValidator, PasswordValidator } from '../Lib/Validator/FormValidator';
import {recaptchaKey, applicationUrl, baseUrl} from '../config/Config'


const LoginForm = ()=>{

    const mounted = useRef(true);
    const dispatch = useDispatch();
    const router = useRouter()
    const [responseData, setResponseData] = useState('');
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [captchaToken, setCapthaToken] = useState('');

    //USING CUSTOM HOOKS FOR USER EMAIL DATA VALIDATION 
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError : nameInputHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler : nameBlurHandler,
        msg: errorMessage
    } = EmailValidator( value => value.trim() !== '');

    //USING CUSTOM HOOKS FOR USER PASSWORD VALIDATION
    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError : passwordInputHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler : passwordBlurHandler,
        reset: resetPasswordInput,
        resetPwd: resetPwd,
        msg: errorPasswordMessage
    } = PasswordValidator( value => value.trim() !== '');


    //GET CAPTHA TOKEN
    const handleToken = (token) => {
        setCapthaToken(token)    
    }

    useEffect(()=>{

        if(Object.keys(responseData).length > 0 && responseData.constructor === Object){
            
            if(mounted){
                const responseCode = responseData.responseCode
            
                if(responseCode === 200){

                    dispatch(doLogin(responseData));
                    setError('');
                    const successMessage = responseData.responseMessage
                    
                    localStorage.setItem("isAuthanticate", 1);
                    localStorage.setItem("doRedirect", 1);
                    localStorage.setItem('authToken', responseData.authToken);
                    localStorage.setItem('authData', JSON.stringify(responseData.responseData));
                    router.push(baseUrl+"/mfa")
                    
                } else {
                    resetPwd();
                    const errorMessage = responseData.responseMessage;
                    setTimeout(() => setError(errorMessage));
                }
            }
        } else {
            const isAuthanticate = localStorage.getItem("isAuthanticate");

            if(isAuthanticate === "1"){
                localStorage.clear()
                dispatch(doLogout())
            }
            setLoading(false)
        }    

        return () => {
            mounted.current = false;
            setTimeout(()=> {
                setError('')
                setLoading(false)
                setResponseData('')
            }, 5 * 1000)
            
        };

    },[responseData])

    //FORM SUBMIT HANDELER
    const verifyLogin = useCallback(async(e)=>{
        e.preventDefault();

        if(!enteredNameIsValid){
            setError(" Enter a Valid Email Address")
            return;
        }
        
        if(!enteredPasswordIsValid){
            setError(" Enter a Valid Password")
            return
        }

        setLoading(true);

        resetPasswordInput();

        const callLogin = await fetch(
            applicationUrl+"/loginApi",
            {
                method: 'POST', 
                body: JSON.stringify({
                    userName : enteredName, 
                    password: enteredPassword, 
                    captchaToken : captchaToken
                })
            }
        )
        const  loginData= await callLogin.json()
        setResponseData(loginData)
    })

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

                <form onSubmit={verifyLogin} method="POST">

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email ID</Form.Label>
                    <br/>
                        <Form.Control                      
                            type="email" 
                            placeholder="name@example.com"
                            className={LoginStyle.formControl}
                            onChange ={nameChangeHandler}
                            onBlur ={nameBlurHandler}
                            value ={enteredName}
                        />
                        {nameInputHasError && errorMessage('Enter A Valid Email Address')}
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="loginPassword">
                        <Form.Label>Password</Form.Label>
                        <br/>
                        <Form.Control
                            type="password" 
                            aria-describedby="passwordHelpBlock"
                            placeholder="&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;" 
                            className={LoginStyle.formControl}
                            onChange ={passwordChangeHandler}
                            onBlur ={passwordBlurHandler}
                            value ={enteredPassword}
                        />
                        {passwordInputHasError && errorPasswordMessage('Password Should Not Empty')}
                    </Form.Group>

                    <div className={LoginStyle.formControl}>
                        <ReCaptchaV2  
                            className="g-recaptcha" 
                            sitekey={recaptchaKey} 
                            render="explicit" 
                            onChange={handleToken}                             
                        />
                    </div>

                    <div className="d-grid">
  
                        <Button 
                            type="submit" 
                            variant="primary" 
                            size="lg"
                           disabled ={isLoading}
                            >
                            {isLoading ? 'Verifying...' : 'Login'}
                        </Button>
                        
                    </div>
                </form>
        </div>
    )
}

export default LoginForm