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
import jwt from 'jsonwebtoken'

const App = (storeProps) => {

  // Persitent login, check for token and expiration date.
  if(!storeProps.userData.loggedIn && localStorage.getItem('token') && localStorage.getItem('tokenExpiration')){
    const tokenExpiration = new Date(localStorage.getItem('tokenExpiration') * 1000);
    if(new Date() < tokenExpiration){
      const tokenData = jwt.decode(localStorage.getItem('token')).data
      const userData = {
        loggedIn: true,
        id: tokenData.id,
        email: tokenData.email,
        firstName: tokenData.first_name,
        lastName: tokenData.last_name
      }
      storeProps.setUserData(userData);
      storeProps.setSnackbar(true, 'success', `Welcome ${userData.firstName} ${userData.lastName} :)`)
    }
    else{
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration')
    }
  }

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
