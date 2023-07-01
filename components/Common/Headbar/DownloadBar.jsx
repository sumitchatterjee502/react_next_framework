import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import TopBar from '../Wrapper/Topbar/TopBar'
import DownloadListBar from '../ListItem/DownloadBar/DownloadListBar';
import { applicationUrl, baseUrl } from '../../config/Config';

const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

//FILE DOWNLOAD SCRIPT
const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
};


const DownloadBar=(props)=> {

    const authToken = '';
    const router = useRouter();
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [networkError, setNetworkError] = useState('')

    useEffect(()=>{
        setData([{
            name: " Rejected csp users",
            listItem : baseUrl+"/fetchRejectList",
            isMenuActive : props.rejectCSPUserListPrivilege,
            icon : "fas fa-download text-danger pr-2",
            clickEventData : "fetchRejectList"        
        },{
            name: "Completed csp users",
            listItem : baseUrl+"/fetchCompletedList",
            isMenuActive : props.completeCSPUserListPrivilege,
            icon : "fas fa-download text-success pr-2",
            clickEventData : "fetchCompletedList"
        }]);
    },[])

    //CALL ALL DOWNLOAD APIS CALLING
    const fetchDataDownloadList = useCallback(async(data)=>{

        if(data === "fetchRejectList"){
            const fetchData = await fetch(
                applicationUrl+"/cspRejectedUserApi",
                {
                    method : "POST",
                    body: JSON.stringify({
                        authToken
                    })
                }
            )

            const responseData = await fetchData.json()
            const responseCode = responseData.responseCode;

            if(responseCode === 200){
                const reData = responseData.responseData
                setError('')
                setNetworkError('')
                exportToCSV(reData, "cspRejectUsers")
                
            }else if (responseCode === 401){
                const responseMessage = responseData.responseMessage;
                setError('')
                setNetworkError(responseMessage)

            }else {
                const responseMessage = responseData.responseMessage;
                setNetworkError('')
                setError(responseMessage);                
            }

        }else if(data === "fetchCompletedList"){

            const fetchData = await fetch(
                applicationUrl+"/cspCompletedUserApi",
                {
                    method : "POST",
                    body: JSON.stringify({
                        authToken
                    })
                }
            )

            const responseData = await fetchData.json()
            const responseCode = responseData.responseCode;

            if(responseCode === 200){
                const reData = responseData.responseData
                setError('')
                setNetworkError('')
                exportToCSV(reData, "cspCompletedUsers")
            }else if (responseCode === 401){
                const responseMessage = responseData.responseMessage;
                setError('')
                setNetworkError(responseMessage)

            }else {
                const responseMessage = responseData.responseMessage;
                setNetworkError('')
                setError(responseMessage);                
            }
        }
    })

    if(typeof window !== "undefined"){
        authToken = localStorage.getItem('authToken') ? localStorage.getItem('authToken') : '';
        if(!authToken){
            router.replace("login");
            return null
        }
    }
    

    if(networkError){

        router.replace("login");
        return null
        
    }
    
    if(data.length < 0){
        return  
    }

    return (
        <TopBar>
            <DownloadListBar downloadList ={data} onFetchDataDownloadList = {fetchDataDownloadList}/>
        </TopBar>
    )
}
export default React.memo(DownloadBar)

