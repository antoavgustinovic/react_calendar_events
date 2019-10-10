import React, { useState } from 'react';
import { GoogleLogout } from 'react-google-login';
import style from './Header.module.css';
import AddEvent from './../HomePage/Events/AddEvent';

function Header(props) {
  // Logout
  const logout = () => {
    localStorage.setItem('loggedIn', false);
    localStorage.removeItem('accessToken');
    props.props.history.push('/login');
  };

  return (
    <header className={style.header}>
      <div className={style.gbtn}>
        <GoogleLogout
          clientId="695308344557-qaep1rg6cr8v58u7alojih9f9lggnk29.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}
        ></GoogleLogout>
      </div>
      <h1>Calendar Events</h1>
      <div>
        <button
          onClick={props.handleSubmit}
          name="nextDay"
          className={style.btn}
        >
          Next 24 Hours
        </button>
        <button
          onClick={props.handleSubmit}
          name="next7Days"
          className={style.btn}
        >
          Next 7 days
        </button>
        <button
          onClick={props.handleSubmit}
          name="next30Days"
          className={style.btn}
        >
          Next 30 days
        </button>
      </div>
      <div>
        <AddEvent addEventFunction={props.addEventFunction} />
      </div>
    </header>
  );
}

export default Header;
