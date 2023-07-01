import React from "react";
import { Table } from "react-bootstrap";
import ThemeStyle from '../../../../styles/ThemeStyle.module.css';

const TableWrapper = (props)=>{

    return(
        <Table className="hover table-scrollable">
            <thead>
                <tr className={`${props.tableClass === 'pending_table' ?  ThemeStyle.pending_table : ThemeStyle.userTableRow}`}>
                    {props.theader.map( headerData => (
                        <th key={headerData} scope="col" className={ThemeStyle.alignMiddle}>{headerData}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.children}
            </tbody>
        </Table>
    )
}


export default React.memo(TableWrapper)