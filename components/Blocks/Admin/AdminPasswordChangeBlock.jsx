import React,{useCallback, useState} from "react";
import {useRouter} from 'next/router';

import { Button, Card, Col, Form, Row } from "react-bootstrap";
import ThemeStyle from '../../../styles/ThemeStyle.module.css';
import ChangePwdStyle from '../../../styles/ChangePwd.module.css';

import {PasswordValidator} from '../../Lib/Validator/FormValidator';
import { applicationUrl } from "../../config/Config";

const AdminPasswordChangeBlock = (props)=>{

    const [error, setError] = useState('');
    const [networkError, setNetworkError] = useState('')
    const [success, setSuccess] = useState('')
    const [toggle, setToggle] = useState(0);
    const router = useRouter();
    const authToken = '';

    if(typeof window !== 'undefined'){
        authToken = localStorage.getItem('authToken') ? localStorage.getItem('authToken') : '';
        if(!authToken){
            router.replace("login");
            return null;
        }
    }

    //CALLING CUSTOM-HOOKS FOR INPUT PASSWORD VALIDATION
    const {
        value: enteredOldPassword,
        isValid: enteredOldPasswordIsValid,
        hasError : oldPasswordInputHasError,
        valueChangeHandler: oldPasswordChangeHandler,
        inputBlurHandler : oldPasswordBlurHandler,
        reset: resetOldPasswordInput,
        msg: errorOldPasswordMessage
    } = PasswordValidator(value => value.trim() !== '');

    const {
        value: enteredNewPassword,
        isValid: enteredNewPasswordIsValid,
        hasError : newPasswordInputHasError,
        valueChangeHandler: newPasswordChangeHandler,
        inputBlurHandler : newPasswordBlurHandler,
        reset: resetNewPasswordInput,
        msg: errorNewPasswordMessage
    } = PasswordValidator(value => value.trim() !== '');

    const {
        value: enteredConfirmPassword,
        isValid: enteredConfirmPasswordIsValid,
        hasError : confirmPasswordInputHasError,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler : confirmPasswordBlurHandler,
        reset: resetConfirmPasswordInput,
        msg: errorConfirmPasswordMessage
    } = PasswordValidator(value => value.trim() !== '');

    const changePassword = async(e)=>{
        e.preventDefault()

        if(enteredNewPassword.trim() === enteredConfirmPassword.trim()){

            const adminChangePassword = await fetch(
                applicationUrl+"/changeAdminPasswordApi",
                {
                    method: "POST",
                    body : JSON.stringify({
                        oldPassword: enteredOldPassword,
                        newPassword: enteredConfirmPassword,
                        authToken: authToken
                    })
                }
            )

            const responseData =  await adminChangePassword.json()
            const responseCode = responseData.responseCode
            
            if(responseCode === 200){
                const responseMessage = responseData.responseMessage;
                setSuccess(responseMessage)
                setToggle(true)

            }else if(responseCode === 401){
                const responseMessage = responseData.responseMessage
                setNetworkError(responseMessage);
                setError('');
            }else {
                const responseMessage = responseData.responseMessage
                setNetworkError('')
                setError(responseMessage)
            }
            
        } else {
            setError('New Password & Confirm Password Are Not Matched');
        }
    }

    if(networkError){
        props.onPageReload(networkError)
    }


    return(
        <Row>
            <Col md ={6}></Col>
            <Col md ={6}>
                <Card className={` ${ThemeStyle.shadow}`}>
                    <Card.Body className={ChangePwdStyle.wraper}>
                        <div className={ThemeStyle.head}>
                            <h1>Change Password(Admin)</h1>
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
                            <form onSubmit={changePassword}>
                                <Form.Group className='mb-4' controlId="oldPassword">
                                    <Form.Label>Old Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;"
                                        onChange={oldPasswordChangeHandler}
                                        onBlur={oldPasswordBlurHandler}
                                        value={enteredOldPassword}
                                    />
                                    {oldPasswordInputHasError && errorOldPasswordMessage("Enter Old Password")}
                                </Form.Group>

                                <Form.Group className='mb-4' controlId="newPassword">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;"
                                        onChange={newPasswordChangeHandler}
                                        onBlur={newPasswordBlurHandler}
                                        value={enteredNewPassword}
                                    />
                                    {newPasswordInputHasError && errorNewPasswordMessage("Enter New Password")}
                                </Form.Group>

                                <Form.Group className='mb-4' controlId="newPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="&#183;&#183;&#183;&#183;&#183;&#183;&#183;&#183;"
                                        onChange={confirmPasswordChangeHandler}
                                        onBlur={confirmPasswordBlurHandler}
                                        value={enteredConfirmPassword}
                                    />
                                    {confirmPasswordInputHasError && errorConfirmPasswordMessage("Enter Confirm Password")}
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

export default AdminPasswordChangeBlock;