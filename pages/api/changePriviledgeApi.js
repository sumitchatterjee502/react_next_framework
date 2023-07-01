import axios from "axios";
import { apiUrl } from "../../components/config/Config";

const ChangePriviledgeApi = (req, res)=>{

    if(req.method === "POST"){
        const data = JSON.parse(req.body);

        const headers = {
            'Content-Type': 'application/json',
            'Authorization' : data.authToken ?  'Bearer '+data.authToken : ''
        }

        axios.post(
            apiUrl+'/blockUnblockAdminUser',
            {
                adminUserid : data.adminUserid
            },
            {
                headers: headers
            }
        )
        .then(resp =>{
            const responseCode = resp.data.responseCode;

            if(responseCode === 200){

                const successMessage = resp.data.responseMessage;
                
                return res.json({
                    responseCode :  responseCode,
                    responseMessage : successMessage
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

    } else {
        return res.json({
            responseCode : "403",
            responseMessage : "BAD REQUEST: GET METHOD NOT ALLOWED"
        })
    }
}

export default ChangePriviledgeApi;