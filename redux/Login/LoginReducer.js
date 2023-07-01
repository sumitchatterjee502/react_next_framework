import { Login, Logout } from "./LoginTypes";
//import encryptStorage from '../../KycAdminPanel/Hooks/Encryption'
var isAuthanticate = ''
var payload = ''
var token = ''

//GET DATA FROM LOCALSTORAGE (FOR SESSION)
if(typeof window !== 'undefined'){

    isAuthanticate = localStorage.getItem('isAuthanticate') ? localStorage.getItem('isAuthanticate') : 0;
    payload = localStorage.getItem('authData') ? localStorage.getItem('authData') : '';
    token = localStorage.getItem('authToken') ?  localStorage.getItem('authToken') : '';
}
    
//INITIALIZE STATE
const initialState = {
    isAuthanticate : isAuthanticate,
    authToken:token,
    payload: payload
}

const LoginReducer = (state = initialState, action)=>{
    // console.log(action.type);
    switch(action.type){
        
        case Login : return {
            ...state,
            isAuthanticate : 1,
            authToken: action.authToken,
            payload: action.payload
        }

        case Logout : return{
            isAuthanticate : 0,
            payload : ''
        }

        default : return state
    }
}

export default LoginReducer