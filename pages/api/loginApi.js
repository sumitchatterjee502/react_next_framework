import axios from 'axios';
import {apiUrl} from '../../components/config/Config';

const headers = {
    'Content-Type': 'application/json'
}

const LoginApi = (req, res)=>{

    if(req.method === "POST"){
        const data = JSON.parse(req.body)
        
        axios.post(
            apiUrl+"/login",
            {
                emailAddress : data.userName,
                password: data.password,
                captchaToken: data.captchaToken   
            }
        )
        .then(resp =>{
            //GET RESPONSE FROM THE API
            const responseCode = resp.data.responseCode;

            if(responseCode === 200){
                const successMessage = resp.data.responseMessage;
                const userApiData = resp.hasOwnProperty('data') ?  resp.data : '';
                const privilege = userApiData.privilege ? userApiData.privilege : '';
                const isSuper = userApiData.isSuper;

                const respObj = {
                    isSuper: isSuper,
                    privilege : privilege
                }
                const token = userApiData.JWTTOKEN;

                //INITIALIZE ALL API DATA INTO THE STATE
                return res.json({
                    responseCode : responseCode,
                    responseMessage : successMessage,
                    authToken: token,
                    responseData : respObj
                })
            } else {
                //INITIALIZE ALL API ERROR Message into the state
                
                const errorMessage = resp.data.responseMessage;
                return res.json({
                    responseCode : responseCode,
                    responseMessage: errorMessage
                });
            }
        })
        .catch(err =>{

            return res.json({
                responseCode : "504",
                responseMessage : "BAD REQUEST: SOMETHING WENT WRONG"
            })
        })
        
    }else {
        return res.json({
            responseCode : "403",
            responseMessage : "BAD REQUEST: GET METHOD NOT ALLOWED"
        })
    }
}

export default LoginApi