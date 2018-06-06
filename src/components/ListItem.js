import React, {Component} from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { CardSection } from './commons';
import moment from 'moment';


class ListItem extends Component{

    onRowPress(){
        Actions.marcador({partido: this.props.partido});
    }

    render(){

        const {local,visitante,fecha} =  this.props.partido

        return(
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <View>
                    <CardSection style={styles.contentStyle} >
                    <Text style={styles.titleStyles}>{local.nombre} - {visitante.nombre} {moment(fecha).format('h:mm a')}</Text>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyles: {
        fontSize: 18,
        
    },
    contentStyle:{
        justifyContent: 'center'
    }
}

export default ListItem;