/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import LoginPage from './Components/Login/LoginPage';
import HomePage from './Components/HomePage/HomePage';

function App() {
  const loggedIn = localStorage.getItem('loggedIn');

  return (
    <Router>
      <div className="App">
        <Route exact path="/">
          {loggedIn ? <Redirect to="/home" /> : <Redirect to="/login" />}
        </Route>
        <Route path="/home" component={HomePage} />
        <Route path="/login" component={LoginPage} />
      </div>
    </Router>
  );
}

export default App;
