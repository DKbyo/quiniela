import axios from 'axios';
import { GET_PARTIDOS,GET_EQUIPOS , SAVE_MARCADOR, ERROR_SAVE, ERROR_GET_PARTIDOS, RESET_SUCCESS_AND_ERROR } from './types';
import { GET_PARTIDOS_URL,GET_EQUIPOS_URL , UPDATE_PARTIDO_URL } from './properties';
import {AsyncStorage} from 'react-native';

export const resetError =  () =>{
    return(dispatch)=>{
        dispatch({
            type:RESET_SUCCESS_AND_ERROR
        });
    }
}

export const saveMarcador = ({id_firestore,marcador_local,marcador_visitante}) =>{

    return (dispatch) =>{

        AsyncStorage.getItem('token').then((value)=>{
           
            var token = value;

            var data = {
                "partido":{
                    "id":id_firestore,
                    "marcador_local":parseInt(marcador_local),
                    "marcador_visitante":parseInt(marcador_visitante)
                }
            };

            var config = {
                "headers":{
                "Authorization": token
            }
        };

            axios.post(UPDATE_PARTIDO_URL,data,config).then((response)=>{
              
                dispatch({
                    type:SAVE_MARCADOR,
                    payload: response.data
                });
            }).catch((error)=>{
                dispatch({
                    type:ERROR_SAVE
                });
            });
            

        }).catch((error)=>{
            dispatch({
                type:ERROR_SAVE
            });
        });
        
    }

}


export const getPartidos = () =>{
    return (dispatch) =>{
        
         axios.get(GET_PARTIDOS_URL).then((response)=>{
            var partidos = response.data;

            axios.get(GET_EQUIPOS_URL).then((equiposR)=>{
                var equipos = equiposR.data.equipos;
                partidos.partidos.forEach((p,indice) => {
                    equipos.forEach((e,index)=>{
                        if(p.local === e.id){
                            partidos.partidos[indice].local=e;
                        } 

                        if(p.visitante === e.id){
                            partidos.partidos[indice].visitante = e;
                        }
                    });
                });
                dispatch({
                    type: GET_PARTIDOS,
                    payload : partidos
                });

            }).catch((error)=>{
                dispatch({
                    type: ERROR_GET_PARTIDOS
                });
            });
        
         })
         .catch((error)=>{
            dispatch({
                type: ERROR_GET_PARTIDOS
            });
         });
    };
};