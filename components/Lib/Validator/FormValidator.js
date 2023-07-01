import { useState, useCallback } from "react";

//INPUT VALIDATION FUNCTION
const InputValidator = (validValue)=>{
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validValue(enteredValue); //CHECK TRUE OR FALSE
    const hasError = !valueIsValid && isTouched;

    //state change input wise
    const valueChangeHandler = useCallback(e =>{
        const inputData = removeStripTags(e.target.value);

        if(inputData){
            setEnteredValue(inputData);
        }else{
            setEnteredValue('');
        }       
    })

    //check is input element is toched or not
    const inputBlurHandler = useCallback(e =>{
        setIsTouched(true)
    })

    //remove strips tags
    const removeStripTags = useCallback(str =>{
        if((str === null) || (str === '') || (str === ' ')){
            return false;
        }else {
            const strd = str.toString();
            return strd.replace( /[&\/\\#,`=^+()$~%.'":*?<>{}]/g, '');
        }
    })

    //dynamic Classes Added is valid or not vaild
    const inputClasses = useCallback((failureClasses, successClasses)=>{
        return hasError ? failureClasses : successClasses
    })

    //error message print
    const errorMessage = useCallback((message)=>{
        return <p className ="text-danger">{message}</p>
    })

    //form reset element
    const reset = useCallback(()=>{
        setEnteredValue('');
        setIsTouched(false)
    })

    return{
        value: enteredValue,
        valueChangeHandler,
        inputBlurHandler,
        isValid: valueIsValid,
        hasError,
        classes : inputClasses,
        msg : errorMessage,
        reset
    }
}

//INPUT CHARACTER VALIDATION FUNCTION
const InputCharacter = (validValue)=>{
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validValue(enteredValue); //CHECK TRUE OR FALSE
    const hasError = !valueIsValid && isTouched;

    //state change input wise
    const valueChangeHandler = e =>{
        const inputData = removeStripTags(e.target.value);

        if(inputData){
            setEnteredValue(inputData.toUpperCase());
        }else{
            setEnteredValue('');
        }       
    }

    //check is input element is toched or not
    const inputBlurHandler = e =>{
        setIsTouched(true)
    }

    //remove strips tags
    const removeStripTags = str =>{
        if((str === null) || (str === '') || (str === ' ')){
            return false;
        }else {
            const strd = str.toString();
            return strd.replace( /[&\/\\#,`=^+()$~%.@'":*?<>!_{}0-9]/g, '');
        }
    }

    //dynamic Classes Added is valid or not vaild
    const inputClasses = (failureClasses, successClasses)=>{
        return hasError ? failureClasses : successClasses
    }

    //error message print
    const errorMessage = (message)=>{
        return <p className ="text-danger">{message}</p>
    }

    //form reset element
    const reset = ()=>{
        setEnteredValue('');
        setIsTouched(false)
    }

    return{
        value: enteredValue,
        valueChangeHandler,
        inputBlurHandler,
        isValid: valueIsValid,
        hasError,
        classes : inputClasses,
        msg : errorMessage,
        reset
    }
}

//EMAIL VALIDATION FUNCTION
const EmailValidator = (validValue)=>{
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const regex = /^(([^<>!()[\]\.,!;:\s@\"]+(\.[^<>()![\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()![\]\.,;!:\s@\"]+\.)+[^<>()![\]\.,!;:\s@\"]{2,})$/i;

    const valueIsValid = regex.test(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = useCallback(e =>{
        const inputData = removeStripTags(e.target.value);

        if(inputData){
            setEnteredValue(inputData);
        }else{
            setEnteredValue('');
        }   
    })

    const inputBlurHandler = useCallback(e =>{
        setIsTouched(true)
    })

    //remove strips tags
    const removeStripTags = useCallback(str =>{
        if((str === null) || (str === '') || (str === ' ')){
            return false;
        }else {
            const strd = str.toString();
            return strd.replace( /^[&\/\\[\];#,`=^+()|!$~%'":*?<>{}]/g, '');
        }
    })

     //dynamic Classes Added is valid or not vaild
    const inputClasses = useCallback((failureClasses, successClasses)=>{
        return hasError ? failureClasses : successClasses
    })

    //error message print
    const errorMessage = useCallback((message)=>{
        return <p className ="text-danger">{message}</p>
    })

    //form reset element
    const reset = useCallback(()=>{
        setEnteredValue('');
        setIsTouched(false)
    })

    return {
        value: enteredValue,
        valueChangeHandler,
        inputBlurHandler,
        isValid: valueIsValid,
        hasError,
        classes : inputClasses,
        msg : errorMessage,
        reset
    }
}

//INPUT NUMBER VALIDATION FUNCTION
const InputNumber = (vaildValue)=>{
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    
    const validate = (data)=>{
        const regex = /^(\d{0,6})$/i;
        const a = regex.test(data);
        return a
    }

    const valueIsValid = validate(enteredValue)
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = useCallback(e =>{
 
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setEnteredValue(e.target.value)
        }
    })

    const inputBlurHandler = useCallback(e =>{
        setIsTouched(true)
    })

    //remove strips tags
    const removeStripTags = useCallback(str =>{
        const re = /^[0-9\b]+$/
        if((str === null) || (str === '') || (str === ' ') || (re.test(str))){
            return str
        }
    })

     //dynamic Classes Added is valid or not vaild
    const inputClasses = useCallback((failureClasses, successClasses)=>{
        return hasError ? failureClasses : successClasses
    })

    //error message print
    const errorMessage = useCallback((message)=>{
        return <p className ="text-danger">{message}</p>
    })

    //form reset element
    const reset = useCallback(()=>{
        setEnteredValue('');
        setIsTouched(false)
    })

    return {
        value: enteredValue,
        valueChangeHandler,
        inputBlurHandler,
        isValid: valueIsValid,
        hasError,
        classes : inputClasses,
        msg : errorMessage,
        reset
    }
}

const PhNumber = (vaildValue)=>{
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    
    const validate = (data)=>{
        const regex = /^(\d{10})$/i;
        const a = regex.test(data);
        return a  
    }

    const valueIsValid = validate(enteredValue)
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = useCallback(e =>{
 
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setEnteredValue(e.target.value)
        }
    })

    // const valueChangeHandler = useCallback(e =>{
    //     const inputData = removeStripTags(e.target.value);

    //     if(inputData){
    //         setEnteredValue(inputData);
    //     }else{
    //         setEnteredValue('');
    //     }   
    // })

    const inputBlurHandler = useCallback(e =>{
        setIsTouched(true)
    })

    //remove strips tags
    const removeStripTags = useCallback(str =>{
        if((str === null) || (str === '') || (str === ' ')){
            return false;
        }else {
            const strd = str.toString();
            return strd.replace( /[&\/\\#,`=^+()$~%'.":;^[]*?<>{}]/g, '');
        }
    })

     //dynamic Classes Added is valid or not vaild
    const inputClasses = useCallback((failureClasses, successClasses)=>{
        return hasError ? failureClasses : successClasses
    })

    //error message print
    const errorMessage = useCallback((message)=>{
        return <p className ="text-danger">{message}</p>
    })

    //form reset element
    const reset = useCallback(()=>{
        setEnteredValue('');
        setIsTouched(false)
    })

    return {
        value: enteredValue,
        valueChangeHandler,
        inputBlurHandler,
        isValid: valueIsValid,
        hasError,
        classes : inputClasses,
        msg : errorMessage,
        reset
    }
}

//Password Validator
const PasswordValidator=(validateValue)=> {

    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);
    
    const valueIsValid = validateValue(enteredValue);
    
    const validate = (data)=>{
       const paswd= /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
       const a = paswd.test(data);
       return a
    }

    const checkPassword = validate(enteredValue);    
    const hasError = !checkPassword && isTouched ;

    const valueChangeHandler = useCallback(e =>{
        setEnteredValue(e.target.value)
    })

    const inputBlurHandler = useCallback(e =>{
        setIsTouched(true)
    })

    const createUniqueKey = (e)=>{
        for (var a =[], r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", c = r.length, s = 0; s < e; s++)
            a.push(r.charAt(Math.floor(Math.random() * c)));
            return a.join("");
    } 

    const reset = useCallback(()=>{
        const Pwd = createUniqueKey(32)
        setEnteredValue(Pwd);
        setIsTouched(false)
    })

    const resetPwd = useCallback(()=>{
        setEnteredValue('')
        setIsTouched(false)
    })

    const nameInputClasses = useCallback(()=>{
        return hasError ? 'form-control is-invalid' :  'form-control'
    })

    const errorMessage = useCallback((message) =>{
        if(!valueIsValid && isTouched){
            return <p className ="text-danger">{message}</p>
        } else if(hasError){
            return <p className ="text-danger">Password Contain (Upper & LowerCase Number Symbol) & 6 digit</p>
        }
        
    })
    
    return{
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        classes: nameInputClasses,
        valueChangeHandler,
        inputBlurHandler,
        reset,
        resetPwd,
        msg: errorMessage
    }
}

export{
    InputValidator,
    InputCharacter,
    EmailValidator,
    InputNumber,
    PasswordValidator,
    PhNumber
}