import React,{useState, useEffect, useCallback} from 'react';
import _ from 'lodash';
import {Pagination} from 'react-bootstrap';
import ThemeStyle from '../../../styles/ThemeStyle.module.css'

import TableWrapper from '../Wrapper/Table/TableWrapper';

const ProcessPendingTableList= (props)=>{

    const processPendingUserList = props.tableList;
    const pageSize = props.pageSize;
    const[startIndexNumber, setStartIndexNumber] =useState()

    const startIndex = startIndexNumber ? startIndexNumber : 0;

    const [paginateProcessPendingPosts, setPaginatedProcessPendingPosts] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    
    useEffect(()=>{
        if(processPendingUserList !== ''){
            setPaginatedProcessPendingPosts(_(processPendingUserList).slice(startIndex).take(pageSize).value())
        }else{
            setPaginatedProcessPendingPosts('')
        }
        
    },[processPendingUserList, pageSize]);
    
    const pageCount = processPendingUserList ? Math.ceil(processPendingUserList.length/pageSize) : 0;

    const pages = _.range(1, pageCount+1);

    const pagination = useCallback((pageNo)=>{
        setCurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        setStartIndexNumber(startIndex)
        const paginatedPosts = _(processPendingUserList).slice(startIndex).take(pageSize).value();
        setPaginatedProcessPendingPosts(paginatedPosts)
    })

    return(
        <React.Fragment>
            <TableWrapper theader = {props.theader} tableClass ={props.tableClass}>
                {
                    !paginateProcessPendingPosts ? (
                        <tr>
                            <td colSpan={props.theader.length} className ={ThemeStyle.alignMiddle}>
                                <p className ="text-center">{props.errorMessage}</p>
                            </td>
                        </tr>
                    ):(
                        <React.Fragment>
                            {
                                paginateProcessPendingPosts.map((tableData, index)=>(
                                    <tr key={index}>
                                        <td className={ThemeStyle.alignMiddle}>{tableData.createdAt}</td>
                                        <td className={ThemeStyle.alignMiddle}>{tableData.fullName}</td>
                                        <td className={ThemeStyle.alignMiddle}>{tableData.mobileNumber}</td>
                                        <td className={`${ThemeStyle.alignMiddle} ${tableData.isOtpValidate ==='YES' ? ThemeStyle.textStyleGreen: ThemeStyle.textStyleRed}`}>{tableData.isOtpValidate}</td>
                                        <td className={`${ThemeStyle.alignMiddle} ${tableData.isRurn ==='YES' ? ThemeStyle.textStyleGreen: ThemeStyle.textStyleRed}`}>{tableData.isRurn}</td>
                                        <td className={`${ThemeStyle.alignMiddle} ${tableData.isBioKyc ==='YES' ? ThemeStyle.textStyleGreen: ThemeStyle.textStyleRed}`}>{tableData.isBioKyc}</td>
                                        <td className={`${ThemeStyle.alignMiddle} ${tableData.isRBLRequiry ==='YES' ? ThemeStyle.textStyleGreen: ThemeStyle.textStyleRed}`}>{tableData.isRBLRequiry}</td>
                                        <td className={`${ThemeStyle.alignMiddle} ${tableData.isCSPOnboarding ==='YES' ? ThemeStyle.textStyleGreen: ThemeStyle.textStyleRed}`}>{tableData.isCSPOnboarding}</td>
                                        <td className={`${ThemeStyle.alignMiddle} ${tableData.agentConsentStatus ==='YES' ? ThemeStyle.textStyleGreen: ThemeStyle.textStyleRed}`}>{tableData.agentConsentStatus}</td>
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
    );
}

export default React.memo(ProcessPendingTableList)