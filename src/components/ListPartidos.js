import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getPartidos } from '../actions/PartidosActions';
import { ListView, Text } from 'react-native';
import ListItem from './ListItem';


class ListPartidos extends Component { 

    componentWillMount(){
        this.props.getPartidos();
        this.createDataSource(this.props)
    }

    componentWillReceiveProps(nextProps){
        this.createDataSource(nextProps.partidos);
    }

    createDataSource({partidos}){
        const ds = new ListView.DataSource({
            rowHasChanged: (r1,r2) => r1 !== r2
        });
       this.dataSource = ds.cloneWithRows(partidos);
    }

    renderRow(partido){
        return <ListItem partido={partido} />
    }

    render(){
        return(
          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
           />

        )
    }

}

const mapStateToProps = (state) => {
    return { partidos : state.partidosR.partidos }
};


export default connect(mapStateToProps,{getPartidos})(ListPartidos);