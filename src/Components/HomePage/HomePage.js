import React, { useState, useEffect } from 'react';
import { GoogleLogout } from 'react-google-login';
import style from './HomePage.module.css';

function HomePage(props) {
  //   const logout = () => {
  //     // console.log(response);
  //     localStorage.setItem('loggedIn', false);
  //     props.history.push('/login');
  //   };

  const logout = () => {
    // console.log(response);
    localStorage.setItem('loggedIn', false);
    props.history.push('/login');
  };

  return (
    <header className={style.header}>
      <div className={style.btn}>
        <GoogleLogout
          clientId="695308344557-qaep1rg6cr8v58u7alojih9f9lggnk29.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}
        ></GoogleLogout>
      </div>
      <h1>Calendar Events</h1>
    </header>
  );
}

export default HomePage;
