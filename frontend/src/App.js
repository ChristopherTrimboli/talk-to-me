import React from 'react';
import './styles/App.css';
import Navbar from './components/Navbar.js';
import 'typeface-roboto';
import { connect } from 'react-redux';
import selector from './selectors/index.js';
import * as actions from './actions/index.js';

const App = (props) => {
  return (
    <div className="App">
      <Navbar { ...props }/>
    </div>
  );
}

export default connect(selector, actions)(App);;
