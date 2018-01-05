import React, {Component} from 'react';
import {connect} from 'react-redux';
import './PostsScreen.css';
import * as postAction from '../store/posts/actions';
import * as postsSelectors from '../store/posts/reducer';
import * as topicsSelectors from '../store/topics/reducer';
import ListView from '../components/ListView';
import ListRow from '../components/ListRow';
import TopicFilter from '../components/TopicFilter';
import PostView from '../components/PostView';

class PostsScreen extends Component{

    componentDidMount(){
        this.props.dispatch(postAction.fetchPosts());
    }

    render () {
        if (this.props.rowsIdArray.length===0){
            return this.renderLoading();
        } else {
            return this.renderPosts();
        }
    }

    renderPosts(){
        return (
            <div className="PostsScreen">
                <div className="LeftPane">
                    <TopicFilter
                        className="TopicFilter"
                        topics={this.props.topicsByUrl}
                        selected={this.props.currentFilter}
                        onChanged={this.onFilterChanged.bind(this)}
                    />
                    <ListView 
                        rowsIdArray={this.props.rowsIdArray}
                        rowsById={this.props.rowsById}
                        renderRow={this.renderRow.bind(this)}
                    />
                </div>
                <div className="ContentPane">
                    <PostView post={this.props.currentPost} />
                </div>
            </div>
        );
    }
    
    renderLoading(){
        return (
            <p>I'm loading ... </p>
        );
    }

    renderRow(rowId, row) {
        const selected = this.props.currentPost === row;
        return (
            <ListRow 
                rowId={rowId}
                onClick={this.onRowClick.bind(this)}
                selected={selected}>
                {!row.thumbnail ? false :
                    <img alt={row.title} className="thumbnail" src={row.thumbnail} />
                }
                <h3>{row.title}</h3>
            </ListRow>
        );
    }

    onFilterChanged(newFilter){
        this.props.dispatch(postAction.changeFilter(newFilter));
    }
    onRowClick(rowId) {
        this.props.dispatch(postAction.selectPost(rowId));
    }
}

function mapStateToProps(state){
    const [postsById, postsIdArray] = postsSelectors.getPosts(state);
    return {
        rowsById: postsById,
        rowsIdArray: postsIdArray,
        topicsByUrl: topicsSelectors.getSelectedTopicsByUrl(state),
        currentFilter: postsSelectors.getCurrentFilter(state),
        currentPost: postsSelectors.getCurrentPost(state)
    };
}

export default connect(mapStateToProps)(PostsScreen);