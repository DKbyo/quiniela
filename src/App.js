import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';


import reducers from './reducer';
import Router from './Router';


class App extends Component {


  componentWillMount(){
    const config = {
      apiKey: "AIzaSyBjCYA0VSTa-JyUHMo36DNladpmu5eU07k",
      authDomain: "cotizadores-aa0fd.firebaseapp.com",
      databaseURL: "https://cotizadores-aa0fd.firebaseio.com",
      projectId: "cotizadores-aa0fd",
      storageBucket: "cotizadores-aa0fd.appspot.com",
      messagingSenderId: "1062053988996"
    };

    firebase.initializeApp(config);

  }

  render() {
    const store = createStore(reducers,{},applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}


export default App;