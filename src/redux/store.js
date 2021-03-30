import { createStore, compose, applyMiddleware } from 'redux'
import trackerReducer from './tracker-reducer'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(trackerReducer, composeEnhancers(applyMiddleware(thunk)))

export default store
