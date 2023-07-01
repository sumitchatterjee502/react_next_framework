import React from 'react'

export default function Wrapper(props) {
    return (
        <div className ={props.wrapper}>
            {props.children}
        </div>
    )
}
