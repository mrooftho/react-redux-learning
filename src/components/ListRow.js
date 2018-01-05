import React, {Component} from 'react';

class ListRow extends Component{
    render(){
        const backgroundColor = this.props.selected ? '#c0f0ff' : '#fff';
        
        return (
            <div style= {{backgroundColor}} onClick={this.onClick.bind(this)}>
                {this.props.children}
            </div>
        );
    }

    onClick(){
        this.props.onClick(this.props.rowId);
    }
}

export default ListRow;