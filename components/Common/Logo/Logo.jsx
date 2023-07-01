import LoginStyle from '../../../styles/Login.module.css';
import paythroughLogo from '../../../public/image/paythroughlogo.png'

export default function Logo() {

    return (
        <div className={LoginStyle.logoWraper}>
            <img className={LoginStyle.logo} src={paythroughLogo.src} alt="logo"/>
        </div>
    )
}