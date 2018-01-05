import React, {Component} from 'react';
import {connect} from 'react-redux';
import './TopicsScreen.css';
import * as topicActions from '../store/topics/actions';
import * as topicSelectors from '../store/topics/reducer';
import ListView from '../components/ListView';
import ListRow from '../components/ListRow';

class TopicsScreen extends Component{
    
    componentDidMount(){
        this.props.dispatch(topicActions.fetchTopics());
    }
    
    render(){
        //console.log('TopicsScreen','render',this.props);
        if (this.props.rowsIdArray.length===0){
            return this.renderLoading();
        } else {
            return this.renderTopics();
        }
    }

    renderTopics(){
        return (
            <div className="TopicsScreen">
                <ListView 
                    rowsIdArray={this.props.rowsIdArray}
                    rowsById={this.props.rowsById}
                    renderRow={this.renderRow.bind(this)}
                />
                {! this.props.canFinaliseSelection ? false : <button className="NextScreen" onClick={this.onNextScreenClick.bind(this)}/>}
            </div>
        );
    }

    renderLoading(){
        return (
            <p>I'm loading ... </p>
        );
    }

    renderRow(rowId,row){
        const selected = this.props.selectedIdsMap[rowId];
        //console.log('TopicsScreen','renderRow',selected);
        
        return(
            <ListRow rowId={rowId} onClick={this.onRowClick.bind(this)} selected={selected}>
                <h3>{row.title}</h3>
                <p>{row.description}</p>
            </ListRow>
        );
    }

    onRowClick(rowId){
        this.props.dispatch(topicActions.selectTopic(rowId));
    }

    onNextScreenClick(){
        this.props.dispatch(topicActions.topicSelectionFinalised());
    }
    
}

// which props do we want to inject, given the global store state?
//https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
function mapStateToProps(state){
    return {
        rowsById: topicSelectors.getTopicsByUrl(state),
        rowsIdArray: topicSelectors.getTopicsUrlArray(state),
        selectedIdsMap: topicSelectors.getSelectedTopicUrlsMap(state),
        canFinaliseSelection: topicSelectors.isTopicSelectionValid(state)
    };
}

export default connect(mapStateToProps)(TopicsScreen);
