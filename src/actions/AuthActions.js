import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import { EMAIL_CHANGED,PASSWORD_CHANGED, LOGIN_USER_SUCCESS, 
    LOGIN_USER_FAIL, LOGIN_USER } from './types';
import {GET_TOKEN} from './properties';
import {AsyncStorage } from 'react-native';


export const emailChanged = (text) =>{
    return{
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
}


export const loginUSer = ({email, password}) =>{
    return (dispatch) =>{
        dispatch({type: LOGIN_USER})

        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(user => {

            var data = {
                "usuario":{
                    "correo":email
                }
            };

            axios.post(GET_TOKEN,data)
            .then((response)=>{
                var token = response.data;
                AsyncStorage.setItem('token',token.token);
                loginUserSuccess(dispatch,user);
            }).catch((error)=>{
                loginUserFail(dispatch);
            })
           
        })
        .catch((error)=>{
            loginUserFail(dispatch);
        }); 
    };
};


const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL})
}

const loginUserSuccess = (dispatch,user) =>{
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload : user
    });

    
    Actions.main();
}