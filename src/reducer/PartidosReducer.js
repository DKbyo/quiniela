import { GET_PARTIDOS,GET_EQUIPOS, SAVE_MARCADOR, 
    ERROR_SAVE, ERROR_GET_PARTIDOS, RESET_SUCCESS_AND_ERROR } from '../actions/types';

const INITIAL_STATE = {
    partidos:[]
};


export default (state = INITIAL_STATE, action) =>{

    switch(action.type) {
        case GET_PARTIDOS:
            return {...state, partidos:action.payload, errorPartidos: null};
        case ERROR_GET_PARTIDOS: 
            return {...state, partidos: null, errorPartidos: "Ocurrio un error al intentar obtener los partidos."}
        case SAVE_MARCADOR:
            return {...state, updated: action.payload, errorUpdated:null};
        case ERROR_SAVE:
            return {...state, errorUpdated : "Ocurrio un error al intentar actualizar.", updated:null}
        case RESET_SUCCESS_AND_ERROR:
            return {...state, errorUpdated: null, updated: null}
        default: 
            return state;
    }

};