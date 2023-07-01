import React from 'react'

const ContentBody = (props)=> {
    return (
        <div id="content">
            {props.children}
        </div>
    )
}

export default React.memo(ContentBody)
