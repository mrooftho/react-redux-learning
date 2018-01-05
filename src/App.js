import React, { Component } from 'react';
import {connect} from 'react-redux';
import TopicsScreen from './containers/TopicsScreen';
import PostsScreen from './containers/PostsScreen';
import './App.css';
import * as topicsSelector from './store/topics/reducer';


class App extends Component {
  render() {
    //console.log('App','Render',this.props);
    return (
      <div className="App">
        {this.props.isSelectionFinalised ? <PostsScreen /> : <TopicsScreen />}
      </div>
    );
  }
}

function mapStateToProps(state){
  //console.log('App','mapStateToProps',topicsSelector.isTopicSelectionFinalised(state));
  return {
    isSelectionFinalised: topicsSelector.isTopicSelectionFinalised(state)
  };
}

export default connect(mapStateToProps)(App);
