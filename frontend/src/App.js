import React from 'react';
import './styles/App.css';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Snackbar from './components/Snackbar.js';
import 'typeface-roboto';
import { connect } from 'react-redux';
import selector from './selectors/index.js';
import * as actions from './actions/index.js';

const App = (props) => {
  return (
    <div className="App">
      <Navbar { ...props }/>
      <Snackbar { ...props } />
      <Footer />
    </div>
  );
}

export default connect(selector, actions)(App);;
