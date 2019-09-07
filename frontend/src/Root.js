import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/index';
import App from './App';
import { BrowserRouter as Router} from "react-router-dom";

export default class Root extends Component {
    render() {
        return (
            <Provider {...{store}}>
                <Router>
                    <App />
                </Router>
            </Provider>
        );
    }
}