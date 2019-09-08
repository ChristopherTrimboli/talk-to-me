import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/index';
import App from './App';
import { Router} from "react-router-dom";
import history from './history.js';

const Root = () => {
    return (
        <Provider {...{store}}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    );
}

export default Root;    