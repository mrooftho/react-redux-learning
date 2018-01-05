import _ from 'lodash';
import React, {Component} from 'react';

class ListView extends Component{

    render(){
        //console.log('Listview','render',this.props);
        return(
            <ul>
                {_.map(this.props.rowsIdArray, this.renderRowById.bind(this))}
            </ul>
        );
    }

    renderRowById(rowId){
        return(
            <li key={rowId}>
                {this.props.renderRow(rowId,_.get(this.props.rowsById,rowId))}
            </li>
        );
    }
}

export default ListView;