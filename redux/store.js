import {createStore} from 'redux';
import LoginReducer from './Login/LoginReducer';

const store = createStore(
        LoginReducer
    );

export default store;