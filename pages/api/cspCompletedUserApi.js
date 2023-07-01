import axios from "axios";
import { apiUrl } from "../../components/config/Config";

const CspCompletedUsersApi = (req, res)=>{
    if(req.method === "POST"){
        const data = JSON.parse(req.body);

        const headers = {
            'Content-Type': 'application/json',
            'Authorization' : data.authToken ?  'Bearer '+data.authToken : ''
        }

        axios.post(
            apiUrl+"/cspCompleteUsers",
            {},
            {
                headers: headers
            }
        )
        .then(resp =>{
            const responseCode = resp.data.responseCode;

            if(responseCode === 200){
                
                const userInfo = resp.hasOwnProperty('data')? resp.data : '';
                const userDetails = userInfo.hasOwnProperty('userDetails')? userInfo.userDetails : '';

                if(userDetails){
                    const successMessage = resp.data.responseMessage;
                
                        return res.json({
                            responseCode :  responseCode,
                            responseMessage : successMessage,
                            responseData :  userDetails
                        })

                }else {
                    const responseCode = resp.data.responseCode;
                    const responseMessage = resp.data.responseMessage;
                   
                    return res.json({
                        responseCode : responseCode,
                        responseMessage : responseMessage
                    })
                }
            } else {

                const responseCode = resp.data.responseCode;
                const errorMessage = resp.data.responseMessage;
               
                return res.json({
                    responseCode : responseCode,
                    responseMessage : errorMessage
                })
            }
        })
        .catch( err =>{
            return res.json({
                responseCode : "502",
                responseMessage : "BAD REQUEST: API ERROR"
            })
        })

    }else {
        return res.json({
            responseCode : "403",
            responseMessage : "BAD REQUEST: GET METHOD NOT ALLOWED"
        })
    }
}

export default CspCompletedUsersApi