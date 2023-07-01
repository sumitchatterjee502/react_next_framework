import Script from 'next/script'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from '../redux/store'

function MyApp({ Component, pageProps }) {
  return (
      <Provider store = {store}>
        <Component {...pageProps} />
        <Script src="https://kit.fontawesome.com/7a28902351.js" crossorigin="anonymous"/>
      </Provider>
  )
}

export default MyApp
