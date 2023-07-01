export default function HeaderWrapper(props) {
    return (
        <div className={props.headerWraper}>
            <div className={props.header}>
                {props.children}
            </div>
        </div>
    )
}