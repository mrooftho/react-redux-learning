import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {createStore,applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './store/reducers';

const store = createStore(combineReducers(reducers),applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

registerServiceWorker();

/*
Summary of our opinionated workflow rules
https://hackernoon.com/redux-step-by-step-a-simple-and-robust-workflow-for-real-life-apps-1fdf7df46092

    App state is a first class citizen, structure it like an in-memory database.
    Smart components are not allowed to have any logic except dispatching actions.
    Smart components should always access state through selectors.
    Minimize view logic in smart components by extracting it into dumb components.
    Place all business logic inside action handlers (thunks), selectors and reducers.
    Services must be completely stateless.
*/