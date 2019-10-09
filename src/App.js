/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import LoginPage from './Components/Login/LoginPage';
import HomePage from './Components/HomePage/HomePage';
import { EventsProvider } from './state/EventsContext';

function App() {
  const loggedIn = localStorage.getItem('loggedIn');

  // function PrivateRoute({ isLoggedIn, Component, ...rest }) {
  //   function render(props) {
  //     return isLoggedIn ? <Redirect to="/home" /> : <Component {...props} />;
  //   }
  //   return <Route {...rest} component={render} />;
  // }

  return (
    <Router>
      <EventsProvider>
        <div className="App">
          <Route exact path="/">
            {loggedIn ? <Redirect to="/home" /> : <Redirect to="/login" />}
          </Route>
          <Route path="/home" component={HomePage} />
          <Route path="/login" component={LoginPage} />
        </div>
      </EventsProvider>
    </Router>
  );
}

export default App;
