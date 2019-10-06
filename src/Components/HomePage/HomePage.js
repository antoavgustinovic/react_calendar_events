import React, { useState, useEffect, Fragment } from 'react';
import { useAsync } from 'react-use';
import { GoogleLogout } from 'react-google-login';
import style from './HomePage.module.css';
import { get } from './../../services/api';
import EventList from './Events/EventList';

function HomePage(props) {
  //   const logout = () => {
  //     // console.log(response);
  //     localStorage.setItem('loggedIn', false);
  //     props.history.push('/login');
  //   };

  // const [events, setEvents] = useState([]);

  const { loading, value: events, error } = useAsync(get);
  // console.log('OUTPUT: HomePage -> error', error);
  // console.log('OUTPUT: HomePage -> loading', loading);
  if (events) console.log('OUTPUT: HomePage -> events', events);

  const logout = () => {
    // console.log(response);
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
        {loading ? <div>Loading...</div> : <EventList events={events} />}
      </Fragment>
    </div>
  );
}

export default HomePage;
