import axios from "axios";
import {apiUrl} from '../../components/config/Config';

const UserProfileApi = (req, res)=>{

    if(req.method === "POST"){
        const data = JSON.parse(req.body)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization' : data.authToken ?  'Bearer '+data.authToken : ''
        }

        axios.post(
            apiUrl+'/profile',
            {},
            {
                headers : headers
            }
        )
        .then( resp =>{
            const responseCode = resp.data.responseCode;

            if(responseCode === 200){

                const successMessage = resp.data.responseMessage;
                const userDetailsInfo = resp.hasOwnProperty('data')?  resp.data : '';

                return res.json({
                    responseCode :  responseCode,
                    responseMessage : successMessage,
                    responseData : userDetailsInfo
                })

            }else if(responseCode === 401){

                const errorMessage = resp.data.responseMessage;
                return res.json({
                    responseCode : responseCode,
                    responseMessage : errorMessage,
                });

            }else {
                const errorMessage = resp.data.responseMessage;
                return res.json({
                    responseCode : responseCode,
                    responseMessage : errorMessage,
                });
            }
        })
        .catch( err =>{
            return res.json({
                responseCode : "502",
                responseMessage : "BAD REQUEST: API ERROR"
            })
        })

    } else{
        return res.json({
            responseCode : "403",
            responseMessage : "BAD REQUEST: GET METHOD NOT ALLOWED"
        })
    }
}

export default UserProfileApi