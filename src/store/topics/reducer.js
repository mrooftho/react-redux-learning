// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views

import Immutable from 'seamless-immutable';
import * as types from './actionTypes';
import _ from 'lodash';

//Default state
const initialState = Immutable({
  topicsByUrl: {},
  selectedTopicUrls: [],
  selectionFinalised: false
});

//Reducer
export default function reduce(state = initialState, action = {}) {
  console.log('reducer','topics',action);
  switch (action.type) {
    case types.TOPICS_FETCHED:
    //https://github.com/rtfeldman/seamless-immutable#merge
      return state.merge({topicsByUrl: action.topicsByUrl});
    case types.TOPICS_SELECTED:
      return state.merge({selectedTopicUrls: action.selectedTopicUrls});
    case types.TOPIC_SELECTION_FINALIZED:
      return state.merge({selectionFinalised: true});
    default:
      return state;
  }
}

//Selector
export function getTopicsByUrl(state) {
  return state.topics.topicsByUrl;
}

export function getTopicsUrlArray(state){
  return _.keys(state.topics.topicsByUrl);
}

export function getSelectedTopicUrls(state) {
  return state.topics.selectedTopicUrls;
}

export function getSelectedTopicUrlsMap(state) {
  return _.keyBy(state.topics.selectedTopicUrls);
}

export function getSelectedTopicsByUrl(state) {
  return _.mapValues(_.keyBy(state.topics.selectedTopicUrls), (topicUrl) => state.topics.topicsByUrl[topicUrl]);
}

export function isTopicSelectionValid(state){
  return state.topics.selectedTopicUrls.length === 3;
}

export function isTopicSelectionFinalised(state){
  return state.topics.selectionFinalised;
}
