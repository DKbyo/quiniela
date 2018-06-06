import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PartidosReducer from './PartidosReducer';

export default combineReducers({
    auth: AuthReducer,
    partidosR : PartidosReducer
});