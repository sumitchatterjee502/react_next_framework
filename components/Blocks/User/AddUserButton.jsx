import React from "react";
import Link from 'next/link';
import { baseUrl } from "../../config/Config";
import ThemeStyle from '../../../styles/ThemeStyle.module.css';

const AddUserButton = ()=>{
    return(
        <div className={ThemeStyle.userList_header}>
            <h1 className="pt-1">User List</h1>
            <Link type="button" title="Add User" href={baseUrl+'/add-user'} passHref>
                <a>
                    <span className={ThemeStyle.btn+' '+ThemeStyle.addButton+' material-icons'}>
                        add
                    </span>
                </a>
            </Link>
        </div>
    )
}

export default React.memo(AddUserButton)