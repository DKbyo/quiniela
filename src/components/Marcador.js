import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Text, View , TextInput } from 'react-native';
import { Card, CardSection, Button,Confirm }  from './commons'
import {saveMarcador, resetError} from '../actions'


class Marcador extends Component{

    state ={
        showModal: false
    }


    componentWillMount(){
        if(this.props.partido){
            this.setState({marcador_local:`${this.props.partido.marcador_local}`, 
                marcador_visitante:`${this.props.partido.marcador_visitante}`})
        }
    }

    onAccept(){
        //const {uid} = this.props.employee;
        
    }

    onDecline(){
        this.setState({showModal:false});
    }

    finalizaPress(){
        this.setState({showModal:true});
    }

    saveMarcador(){
        var obj = {
            id_firestore: this.props.partido.id_firestore,
            marcador_local: this.state.marcador_local,
            marcador_visitante: this.state.marcador_visitante
        }

        
        this.props.saveMarcador(obj);
    }

    renderError(){
        if(this.props.errorUpdated){
            return (
                <CardSection>
                    <Text style={styles.errorTextStyle}>{this.props.errorUpdated}</Text>
                </CardSection>
            )
        }
    }

    renderSuccess(){
        if(this.props.updated){

            setTimeout(()=>{
                this.props.resetError()
            },4000)

            return (
                <CardSection>
                    <Text style={styles.succesTextStyle}>{this.props.updated.exito}</Text>
                </CardSection>
            )
        }
    }


    render(){

        const { local , visitante } = this.props.partido;

     
        return (
            <Card>
                <CardSection>
                    <View style={styles.containerStyle}>
                        <Text style={styles.labelStyle}>
                            {local.nombre} 
                        </Text>

                        <TextInput 
                        style={styles.inputStyle}
                        keyboardType='numeric'
                        value={this.state.marcador_local}
                        onChangeText={(text)=>{this.setState({marcador_local:text})}}
                        maxLength={2}  //setting limit of input
                        />
                    </View>
                </CardSection>


                 <CardSection>
                    <View style={styles.containerStyle}>
                        <Text style={styles.labelStyle}>
                            {visitante.nombre} 
                        </Text>
                        <TextInput 
                        style={styles.inputStyle}
                        keyboardType='numeric'
                        value={this.state.marcador_visitante}
                        onChangeText={(text)=>{this.setState({marcador_visitante:text})}}
                        maxLength={2}  //setting limit of input
                        />
                    </View>
                </CardSection>

                {this.renderError()}

                {this.renderSuccess()}

                <CardSection>
                    <Button onPress={this.saveMarcador.bind(this)}>
                        Actualizar
                    </Button>

                    <Button onPress={this.finalizaPress.bind(this)}>
                        Finalizar Partido
                    </Button>
                </CardSection>


                <Confirm 
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                    >
                    Estas seguro de finalizar este partido?
                </Confirm>

                
            </Card>
        )
    }
}

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'

    },
    errorTextStyle :{
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    succesTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'green'
    }
};




const mapStateToProps = state => {

    return {
        updated: state.partidosR.updated,
        errorUpdated: state.partidosR.errorUpdated
    };
}

export default connect(mapStateToProps,{saveMarcador, resetError})(Marcador);