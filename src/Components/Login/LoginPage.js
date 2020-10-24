/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import style from './LoginPage.module.css';
import GoogleLogin from 'react-google-login';

function LoginPage(props) {
  const responseGoogle = (response) => {
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('loggedIn', true);
    props.history.push('/home');
  };

  const onFailure = (error) => {
    alert(error);
  };

  return (
    <div className={style.wrapper}>
      <header className={style.header}>
        <h1>Login</h1>
      </header>
      <div>
        <GoogleLogin
          clientId="695308344557-qaep1rg6cr8v58u7alojih9f9lggnk29.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={onFailure}
          scope="profile email https://www.googleapis.com/auth/calendar"
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </div>
  );
}

export default LoginPage;
