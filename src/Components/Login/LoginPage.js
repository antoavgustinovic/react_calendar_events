import React from 'react';
import style from './LoginPage.module.css';

function LoginPage() {
  return (
    <div className={style.wrapper}>
      <form id={style.myForm}>
        <h1>Login</h1>
        <div>
          <input type="text" id="email" placeholder="Username" />
        </div>
        <div>
          <input type="password" placeholder="Password" />
        </div>
        <div>
          <button className={style.btn} type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
