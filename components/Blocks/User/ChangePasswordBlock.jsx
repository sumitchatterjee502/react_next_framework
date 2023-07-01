import React,{useState, useCallback} from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import {useRouter} from 'next/router';

import ThemeStyle from '../../../styles/ThemeStyle.module.css';
import ChangePwdStyle from '../../../styles/ChangePwd.module.css';

import { PasswordValidator } from "../../Lib/Validator/FormValidator";
import { applicationUrl } from "../../config/Config";

const ChangePasswordBlock =(props)=>{

    const authToken = '';
    const router = useRouter();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')
    const [toggle, setToggle] = useState(0);
    const [networkError, setNetworkError] = useState('')

    const listUserId = props.listUserId;

    const submitHandler = useCallback(async(e)=>{
        e.preventDefault();

        if(enteredPassword.trim() === reEnteredPassword.trim()){
            const userChagePasswordApi = await fetch(
                applicationUrl+"/userChangePasswordApi",
                {
                    method : "POST",
                    body : JSON.stringify({
                        adminUserid : listUserId,
                        confirmPassword : reEnteredPassword,
                        authToken 
                    })
                }
            )

            const changePasswordStatus = await userChagePasswordApi.json();
            const responseCode = changePasswordStatus.responseCode
            
            if(responseCode === 200){
                const responseMessage = changePasswordStatus.responseMessage;
                setSuccess(responseMessage)
                setToggle(true)

            }else if(responseCode === 401){
                const responseMessage = changePasswordStatus.responseMessage
                setNetworkError(responseMessage);
                setError('');
            }else {
                const responseMessage = changePasswordStatus.responseMessage
                setNetworkError('')
                setError(responseMessage)
            }
       
        } else {
            setError("Password Does Not Matched")
            setConfirmPassword("")
            setNewPassword("")
            setNetworkError('')
        }
    })

    if(typeof window !== 'undefined'){
        authToken = localStorage.getItem('authToken') ? localStorage.getItem('authToken') : '';
        if(!authToken){
            router.replace("login");
            return null;
        }
    }

    //CALLING CUSTOM-HOOKS FOR INPUT PASSWORD VALIDATION
    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError : passwordInputHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler : passwordBlurHandler,
        reset: resetPasswordInput,
        msg: errorPasswordMessage
    } = PasswordValidator(value => value.trim() !== '');

    const {
        value: reEnteredPassword,
        isValid: reEnteredPasswordIsValid,
        hasError : reEnteredPasswordInputHasError,
        valueChangeHandler: reEnteredPasswordChangeHandler,
        inputBlurHandler : reEnteredPasswordBlurHandler,
        reset: resetReenteredPasswordInput,
        msg: errorReenteredPasswordMessage
    } = PasswordValidator(value => value.trim() !== '');

    if(toggle){
        setTimeout(()=>{
            router.push("/users")
        }, 3000);
        
    }

    if(networkError){
        props.onPageReload(networkError)
    }

    return(
        <Row>
            <Col md={6}></Col>
            <Col md={6}>
            <Card className={` ${ThemeStyle.shadow}`}>
                    <Card.Body className={ChangePwdStyle.wraper}>
                        <div className={ThemeStyle.head}>
                            <h1>Change Password</h1>
                        </div>

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
                                    {success}
                                </div>
                            </div>
                        )}

                        <div className={ThemeStyle.formWrapper}>
                            <form onSubmit={submitHandler}>
                                <Form.Group className='mb-4' controlId="newPassword">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;"
                                        onChange={passwordChangeHandler}
                                        onBlur={passwordBlurHandler}
                                        value={enteredPassword}
                                    />
                                    {passwordInputHasError && errorPasswordMessage("Password Should not empty")}
                                </Form.Group>

                                <Form.Group className='mb-4' controlId="newPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;"
                                        onChange={reEnteredPasswordChangeHandler}
                                        onBlur={reEnteredPasswordBlurHandler}
                                        value={reEnteredPassword}
                                    />
                                    {reEnteredPasswordInputHasError && errorReenteredPasswordMessage("Password Should not empty")}
                                </Form.Group>
                                <div className="d-grid">
                                    {
                                        toggle ? (
                                            <Button
                                                type = "button"
                                                variant="primary" 
                                                size="md"
                                                className='mt-3'
                                                disabled ={true}
                                            >
                                                Wait..
                                            </Button>
                                        ):(
                                            <Button
                                                type = "submit"
                                                variant="primary" 
                                                size="md"
                                                className='mt-3'
                                            >
                                                Change
                                            </Button>
                                        )
                                    }
                                    
                                </div>
                                
                            </form>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default React.memo(ChangePasswordBlock)