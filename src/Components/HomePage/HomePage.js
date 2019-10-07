/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from 'react';
import { useAsync, useSetState } from 'react-use';
import { GoogleLogout } from 'react-google-login';
import style from './HomePage.module.css';
import { get } from './../../services/api';
import EventList from './Events/EventList';

function HomePage(props) {
  let currTime = new Date();
  let nextDay = new Date();
  let next7Days = new Date();
  let next30Days = new Date();
  nextDay.setDate(currTime.getDate() + 1);
  next7Days.setDate(currTime.getDate() + 7);
  next30Days.setDate(currTime.getDate() + 31);

  // parameters for getting the events from API
  const [params, setParams] = useSetState({
    timeMin: currTime.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
    showDeleted: false,
  });

  //fetching events
  const { loading, value: events, error } = useAsync(get.bind(null, params));

  //logout
  const logout = () => {
    localStorage.setItem('loggedIn', false);
    localStorage.removeItem('accessToken');
    props.history.push('/login');
  };

  //determining time span to display
  const [displayEvents, setDisplayEvents] = useState('next7Days');
  const handleSubmit = (event) => {
    setDisplayEvents(event.target.name);
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
        <div>
          <button onClick={handleSubmit} name="nextDay">
            Next 24 Hours
          </button>
          <button onClick={handleSubmit} name="next7Days">
            Next 7 days
          </button>
          <button onClick={handleSubmit} name="next30Days">
            Next 30 days
          </button>
        </div>
      </header>
      <Fragment>
        {loading ? (
          <div>Loading...</div>
        ) : displayEvents === 'next7Days' ? (
          <EventList
            events={events}
            currTime={currTime}
            next7Days={next7Days}
          />
        ) : displayEvents === 'next30Days' ? (
          <EventList
            events={events}
            currTime={currTime}
            next30Days={next30Days}
          />
        ) : (
          <EventList events={events} currTime={currTime} nextDay={nextDay} />
        )}
      </Fragment>
    </div>
  );
}

export default HomePage;
