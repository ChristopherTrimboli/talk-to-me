import React from 'react';
import './styles/App.css';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Snackbar from './components/Snackbar.js';
import 'typeface-roboto';
import { connect } from 'react-redux';
import selector from './selectors/index.js';
import * as actions from './actions/index.js';
import { Route } from "react-router-dom";
import FrontPage from './containers/FrontPage/index.js'
import CreateProfile from './containers/CreateProfile/index.js'
import { withRouter } from 'react-router-dom';

const App = (storeProps) => {
  return (
    <div className="App">
      <Navbar { ...storeProps }/>
      <Route path="/" exact render={() => <FrontPage {...storeProps}/> } />
      <Route path="/createProfile" exact render={() => <CreateProfile {...storeProps}/> }/>
      <Snackbar { ...storeProps } />
      <Footer />
    </div>
  );
}

export default withRouter(connect(selector, actions)(App));
