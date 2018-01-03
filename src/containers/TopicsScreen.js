import React, {Component} from 'react';
import {connect} from 'react-redux';
import './TopicsScreen.css';
import * as topicActions from '../store/topics/actions';

class TopicsScreen extends Component{
    
    componentDidMount(){
        this.props.dispatch(topicActions.fetchTopics());
    }
    
    render(){
        return (
            <h2>My Topics</h2>
        );
    }

    
}

function mapStateToProps(state){
    return {};
}

export default connect(mapStateToProps)(TopicsScreen);
