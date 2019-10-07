/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from 'react';
import { useAsync, useSetState } from 'react-use';
import { GoogleLogout } from 'react-google-login';
import style from './HomePage.module.css';
import { get } from './../../services/api';
import EventList from './Events/EventList';

function HomePage(props) {
  let today = new Date();
  let thisWeek = new Date();
  let thisMonth = new Date();
  thisWeek.setDate(today.getDate() + 7);
  thisMonth.setDate(today.getDate() + 31);

  const [params, setParams] = useSetState({
    timeMin: today.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
    showDeleted: false,
  });

  const { loading, value: events, error } = useAsync(get.bind(null, params));

  const logout = () => {
    localStorage.setItem('loggedIn', false);
    localStorage.removeItem('accessToken');
    props.history.push('/login');
  };

  return (
    <div>
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
      <Fragment>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <EventList events={events} today={today} thisWeek={thisWeek} />
        )}
      </Fragment>
    </div>
  );
}

export default HomePage;
