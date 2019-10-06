import React, { useState, useEffect } from 'react';
// import { useSetState } from 'react-use';
import style from './LoginPage.module.css';
import GoogleLogin from 'react-google-login';
import { Route, Redirect } from 'react-router';

function LoginPage(props) {
  // const [isLogged, setIsLogged] = useState(false);

  // const signUp = (data) => {
  //   console.log(data);
  //   get(data.accessToken).then((data) => console.log(data));
  //   props.history.push('/home');
  // };

  const responseGoogle = (response) => {
    console.log(response);
    // signUp(response);
    localStorage.setItem('accessToken', response.Zi.access_token);
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
