import React, {useState, useEffect, useCallback} from "react";
import _ from 'lodash'
import Link from 'next/link';
import { Button, Pagination } from "react-bootstrap";
import { baseUrl } from "../../config/Config";
import ThemeStyle from '../../../styles/ThemeStyle.module.css'

import TableWrapper from '../Wrapper/Table/TableWrapper';

const PaginatedTable = (props)=>{

    const tableList = props.tableList;
    const pageSize = props.pageSize;
    const[startIndexNumber, setStartIndexNumber] =useState()

    const startIndex = startIndexNumber ? startIndexNumber : 0;
    
    const [paginatedPosts, setPaginatedPosts] = useState();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if(tableList !== ''){
            setPaginatedPosts(_(tableList).slice(startIndex).take(pageSize).value());       
        }else{
            setPaginatedPosts('')
        }

    }, [tableList, pageSize]);

    const blockUnblock = useCallback((id)=>{
        props.onBlockUnBlock(id);
    })

    const changePriledge = useCallback((id)=>{
        props.onChangePriledge(id)
    })

    const pageCount = tableList ? Math.ceil(tableList.length/pageSize) : 0;
    //if(pageCount === 1) return null;

    const pages = _.range(1, pageCount+1);

    const pagination = (pageNo)=>{
        setCurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        setStartIndexNumber(startIndex)
        const paginatedPosts = _(tableList).slice(startIndex).take(pageSize).value();
        setPaginatedPosts(paginatedPosts)
    }    

    return(
        <React.Fragment>
            <TableWrapper theader = {props.theader} tableClass ={props.tableClass}>
                {
                    !paginatedPosts ? (
                        <tr>
                            <td colSpan={props.theader.length - 1} className ={ThemeStyle.alignMiddle}>
                                <p className ="text-center">No Data Found</p>
                            </td>
                        </tr>
                    ): (
                        <React.Fragment>
                        {
                            paginatedPosts.map((tableData, index)=>(
                                <tr key={index}>
                                    <td className={ThemeStyle.alignMiddle}>{tableData.name}</td>
                                    <td className={ThemeStyle.alignMiddle}>{tableData.emailAddress}</td>
                                    <td className={ThemeStyle.alignMiddle}>{tableData.mobileNumber}</td>
                                    <td className={ThemeStyle.alignMiddle}>{tableData.isBlock ==="1" ? "BLOCK" : "UNBLOCK"}</td>
                                    <td className={ThemeStyle.alignMiddle}>{tableData.isSuper === "1" ? "Super Admin" : "Normal Admin"}</td>
                                    <td className={ThemeStyle.alignMiddle}>
                                    
                                    <Link type="button"  title="Change password" href={`${baseUrl}/users/change-password/${tableData.id}`} passHref>
                                        <span style={{height :"34px"}} className=" btn btn-primary btn-sm material-icons tableIcon">
                                            lock_open
                                        </span>
                                    </Link>
                                    &nbsp;
                                    {props.isSuper === "1" ? (
                                        <React.Fragment>
                                            <Button 
                                                key={index} 
                                                size="sm" 
                                                type="button" 
                                                variant = {`${tableData.isBlock === "1" ? 'success' : 'danger'}`} 
                                                title={tableData.isBlock ==="1" ?"Unblock User": "Block User"} onClick={()=> blockUnblock(tableData.id)} >
                                                <span className="btn-sm material-icons tableIcon" style={{padding: "0px"}}>
                                                    remove_circle_outline
                                                </span>
                                            </Button>
                                            &nbsp;
                                            {/* <Button 
                                                type="button" 
                                                size="sm"
                                                variant ="info"
                                                title="Change User Privilege" 
                                                onClick={()=> changePriledge(tableData.id)}>
                                                    <span className="material-icons tableIcon">
                                                        manage_accounts
                                                    </span>
                                            </Button> */}
                                        </React.Fragment>
                                        ) : (
                                            <p>oi</p>
                                    )}
                                    
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

export default React.memo(PaginatedTable)