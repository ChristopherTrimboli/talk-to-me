import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configure(reducer) {
    return composeEnhancers(
        applyMiddleware(thunkMiddleware)
    )(createStore)(reducer)
}