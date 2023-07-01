import React,{useState, useEffect, useCallback} from "react";
import _ from 'lodash';
import { Button, Pagination } from "react-bootstrap";
import ThemeStyle from '../../../styles/ThemeStyle.module.css';

import TableWrapper from "../Wrapper/Table/TableWrapper";

const PaginatePendingTableList = (props)=>{
    const pendingUserList = props.tableList;
    const pageSize = props.pageSize;
    const[startIndexNumber, setStartIndexNumber] =useState()

    const startIndex = startIndexNumber ? startIndexNumber : 0;

    const [paginatePendingPosts, setPaginatedPendingPosts] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    
    useEffect(()=>{
        if(pendingUserList !== ''){
            setPaginatedPendingPosts(_(pendingUserList).slice(startIndex).take(pageSize).value())
        }else{
            setPaginatedPendingPosts('')
        }
        
    },[pendingUserList, pageSize]);
    
    const pageCount = pendingUserList ? Math.ceil(pendingUserList.length/pageSize) : 0;

    const pages = _.range(1, pageCount+1);

    const pagination = (pageNo)=>{
        setCurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        setStartIndexNumber(startIndex)
        const paginatedPosts = _(pendingUserList).slice(startIndex).take(pageSize).value();
        setPaginatedPendingPosts(paginatedPosts)
    }

    return(
        <React.Fragment>
            <TableWrapper theader = {props.theader} tableClass = {props.tableClass}>
               {
                   !paginatePendingPosts ? (
                        <tr>
                            <td colSpan={props.theader.length - 1} className ={ThemeStyle.alignMiddle}>
                                <p className ="text-center">{props.errorMessage}</p>
                            </td>
                        </tr>
                   ):(
                        <React.Fragment>
                            {
                                paginatePendingPosts.map((tableData, index)=>(
                                    <tr key={index}>
                                        <td className={ThemeStyle.alignMiddle}>{tableData.fullName}</td>
                                        <td className={ThemeStyle.alignMiddle}>{tableData.mobileNumber}</td>
                                        <td className={ThemeStyle.alignMiddle}>{tableData.bcagentId}</td>
                                        <td className={`${ThemeStyle.alignMiddle} ${tableData.OTPValidate ==='YES' ? ThemeStyle.textStyleGreen: ThemeStyle.textStyleRed}`}>{tableData.OTPValidate}</td>
                                        <td className={`${ThemeStyle.alignMiddle} ${tableData.RURN ==='YES'? ThemeStyle.textStyleGreen: ThemeStyle.textStyleRed}`}>{tableData.RURN}</td>
                                        <td className={`${ThemeStyle.alignMiddle} ${tableData.BioKYC ==='YES' ? ThemeStyle.textStyleGreen: ThemeStyle.textStyleRed}`}>{tableData.BioKYC}</td>
                                        <td className={`${ThemeStyle.alignMiddle} ${tableData.RBLRequiry ==='YES' ? ThemeStyle.textStyleGreen: ThemeStyle.textStyleRed}`}>{tableData.RBLRequiry}</td>
                                        <td className={`${ThemeStyle.alignMiddle} ${tableData.CSPOnboarding ==='YES' ? ThemeStyle.textStyleGreen: ThemeStyle.textStyleRed}`}>{tableData.CSPOnboarding}</td>
                                        <td className={ThemeStyle.alignMiddle}>{tableData.sessionRemaks}</td>
                                        <td className={ThemeStyle.alignMiddle}>{tableData.sessionStatus}</td>
                                        <td className={ThemeStyle.alignMiddle}>
                                            <Button variant="primary" size="sm" onClick ={()=> pendingStatusCheck(tableData.mobileNumber)}>
                                                Check Status
                                            </Button>{''}
                                        </td>
                                    </tr>
                                ))
                            }
                        </React.Fragment>
                   )
               }
            </TableWrapper>
            <nav className='d-flex justify-content-center'>
                <Pagination>
                    {
                        pages.map((page, i)=>(
                            <Pagination.Item 
                                key={page} 
                                active ={page === currentPage} 
                                onClick={()=> pagination(page)}
                            >
                                {page}
                            </Pagination.Item>
                        ))
                    }
                </Pagination>
            </nav> 
        </React.Fragment>
    )
}

export default React.memo(PaginatePendingTableList)