import React,{useState, useCallback} from "react";
import { useRouter } from "next/router";

import { Button,Container } from "react-bootstrap";
import ThemeStyle from '../../../styles/ThemeStyle.module.css';
import TableWrapper from "../../Common/Wrapper/Table/TableWrapper";

import {EmailValidator, InputCharacter, PhNumber, PasswordValidator} from '../../Lib/Validator/FormValidator'
import { applicationUrl } from "../../config/Config";


const AddUserBlock = (props)=>{

    const authToken = '';
    const router = useRouter();
    const [priviledge, setPriviledge] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState('')
    const [networkError, setNetworkError] = useState('')
    
    if(typeof window !== 'undefined'){
        authToken = localStorage.getItem('authToken') ? localStorage.getItem('authToken') : '';
        if(!authToken){
            router.replace("login");
            return null
        }
    }

    //CALLING CUSTOM-HOOKS FOR INPUT NAME VALIDATION
    const{
        value: enteredName,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        isValid : enteredNameIsValid,
        hasError: enteredNameError,
        classes : enteredNameClasses,
        msg: enteredNameErrorMessage
    } = InputCharacter(value => value.trim() !== '');

    //CALLING CUSTOM-HOOKS FOR INPUT EMAIL VALIDATION
    const{
        value : enteredEmail,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        isValid : enteredEmailIsValid,
        hasError : enteredEmailError,
        classes : enteredEmailClasses,
        msg : enteredEmailErrorMessage
    } = EmailValidator(value => value.trim() !== '');

    //CALLING CUSTOM-HOOKS FOR INPUT EMAIL VALIDATION
    const{
        value : enteredNumber,
        valueChangeHandler: numberChangeHandler,
        inputBlurHandler: numberBlurHandler,
        isValid : enteredNumberIsValid,
        hasError : enteredNumberError,
        classes : enteredNumberClasses,
        msg : enteredNumberErrorMessage
    } = PhNumber(value => value.trim() !== '');

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

    const toggleCheck = ()=>{
        setPriviledge(!priviledge);
    }

    const theaderData = ['NAME', 'EMAIL-ID','MOBILE NUMBER', 'SET PASSWORD', 'RE-ENTER PASSWORD',''];

    const submitHandler = async()=>{
        if(enteredPassword === reEnteredPassword){
            if(enteredNameIsValid && enteredEmailIsValid && enteredNumberIsValid && enteredPasswordIsValid && reEnteredPasswordIsValid){

                const createAdminUserData = await fetch(
                    applicationUrl+"/createAdminUserApi",
                    {
                        method : "POST",
                        body: JSON.stringify({
                            enteredName,
                            enteredEmail,
                            enteredNumber,
                            enteredPassword,
                            authToken
                        })
                    }
                )

                const adminuserData = await createAdminUserData.json()
                const responseCode = adminuserData.responseCode

                if(responseCode === 200){
                    const responseMessage = adminuserData.responseMessage;
                    setSuccess(responseMessage)
                    setToggle(true)

                }else if(responseCode === 401){
                    const responseMessage = adminuserData.responseMessage
                    setNetworkError(responseMessage);
                    setError('');
                }else {
                    const responseMessage = adminuserData.responseMessage
                    setNetworkError('')
                    setError(responseMessage)
                }
            } else {
                setError(" Kindly Fill Up the All Input Fields")
            }

        } else {
            setError("Password Does Not Matched");
            resetReenteredPasswordInput();
            resetPasswordInput();
        }
    }

    if(error){
        setTimeout(()=>{
            setError('')
        }, 5000);
    }

    if(networkError){
        router.replace("login");
        return null
    }

    return(
        <Container fluid>
            <div className={ThemeStyle.userList_header}>
                <h1 className="">Add New User</h1>
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

            <TableWrapper theader = {theaderData} tableClass ="userTableRow">
                <tr className={ThemeStyle.addUserTableRow}>
                    <td>
                        <input
                            type="text" 
                            placeholder="Enter User's Name"
                            onChange={nameChangeHandler}
                            onBlur={nameBlurHandler}
                            value={enteredName}
                            autoFocus = {true}
                        />
                        {enteredNameError && enteredNameErrorMessage("Eneter A User Name")}
                    </td>
                    <td>
                        <input
                            type="email" 
                            placeholder="Enter Email Id"
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                            value={enteredEmail}
                        />
                        {enteredEmailError && enteredEmailErrorMessage("Enter A valid Email Address")}
                    </td>
                    <td>
                        <input
                            type="text" 
                            placeholder="Enter A Ph No."
                            onChange={numberChangeHandler}
                            onBlur={numberBlurHandler}
                            value={enteredNumber}
                        />
                        {enteredNumberError && enteredNumberErrorMessage("Enter A 10 digit Ph No.")}
                    </td>
                    {/* <td>
                        <Form.Check 
                            className='toggleCheck'
                            type="switch"
                            id="custom-switch"
                            size = "lg"
                            label={!priviledge ? "Normal Admin" : "Super Admin"}
                            checked={priviledge}
                            onChange={toggleCheck}
                        />
                    </td> */}
                    <td>
                        <input
                            type="password" 
                            placeholder="Enter Password"
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler}
                            value={enteredPassword}
                        />
                        {passwordInputHasError && errorPasswordMessage("Password Should not empty")}
                    </td>
                    <td>
                        <input
                            type="password" 
                            placeholder="ReEnter Password"
                            onChange={reEnteredPasswordChangeHandler}
                            onBlur={reEnteredPasswordBlurHandler}
                            value={reEnteredPassword}
                        />
                        {reEnteredPasswordInputHasError && errorReenteredPasswordMessage("Password Should not empty")}
                    </td>
                    <td>
                        <Button 
                            className={ThemeStyle.addBtn} 
                            onClick={submitHandler}
                            >
                            <i className="fas fa-user-plus"></i> Add
                        </Button>
                    </td>
                </tr>
            </TableWrapper>
        </Container>
    )
}

export default React.memo(AddUserBlock);
