import axios from "axios"
import {apiUrl} from '../../components/config/Config';

const VerifyPin = (req, res)=>{

    if(req.method === "POST"){

        const data = JSON.parse(req.body)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization' : data.token
        }

        axios.post(
            apiUrl+'/checkPin',
            {
                pin : data.secretPin,
                captchaToken : data.captchaToken
            },
            {
                headers : headers
            }
        )
        .then( resp =>{

            //GET RESPONSE FROM THE API
            const responseCode = resp.data.responseCode;

            if(responseCode === 200){
                const successMessage = resp.data.responseMessage;
                const userApiData = resp.data ?  resp.data : '';
                const newAuthToken = userApiData.JWTTOKEN

                return res.json({
                    responseCode : responseCode,
                    responseMessage : successMessage,
                    newAuthToken: newAuthToken
                })

            } else if(responseCode === 401){
                const errorMessage = resp.data.responseMessage;
                return res.json({
                    responseCode : responseCode,
                    responseMessage : errorMessage,
                });
                
            } else {

                const errorMessage = resp.data.responseMessage;
                return res.json({
                    responseCode : responseCode,
                    responseMessage : errorMessage,
                });
            }
        })
    }else{
        return res.json({
            responseCode : "403",
            responseMessage : "BAD REQUEST: GET METHOD NOT ALLOWED"
        })
    }
}

export default VerifyPin