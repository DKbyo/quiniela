import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import ListPartidos from './components/ListPartidos';
import Marcador from './components/Marcador';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{ paddingTop: 65 }}>    
           
                <Scene key="auth">
                    <Scene key="login" component={LoginForm} title="Please Login" />
                </Scene>  

                <Scene key="main">
                    <Scene key="listPartidos" component={ListPartidos} title="Partidos de Hoy" />
                    <Scene key="marcador" component={Marcador} title="Marcador" />
                </Scene> 
        </Router>
    );
};



export default RouterComponent;