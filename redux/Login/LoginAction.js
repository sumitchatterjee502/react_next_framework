import { Login, Logout } from "./LoginTypes";

const doLogin = (user)=>{
    return {
        type : Login,
        authToken : user.authToken,
        payload : user.responseData
    }
}

const doLogout =()=>{
    return{
        type: Logout,
    }
}

export{
    doLogin,
    doLogout
}