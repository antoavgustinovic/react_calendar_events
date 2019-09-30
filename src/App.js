import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './Components/Login/LoginPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/login" component={LoginPage} />
      </div>
    </Router>
  );
}

export default App;
