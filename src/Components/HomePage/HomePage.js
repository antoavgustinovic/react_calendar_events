/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from 'react';
import { useAsync, useSetState } from 'react-use';
import { GoogleLogout } from 'react-google-login';
import style from './HomePage.module.css';
import { getEvents, addEvent, delEvent } from './../../services/api';
import EventList from './Events/EventList';
import AddEvent from './Events/AddEvent';

function HomePage(props) {
  let currTime = new Date();

  // parameters for getting the events from API
  const [params, setParams] = useSetState({
    timeMin: currTime.toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
    showDeleted: false,
  });

  let [eventsData, setEventsData] = useState({});

  //fetching events
  // const {loading: eventList.loading, value:eventList.events, error: eventList.error} = useAsync(
  //   getEvents.bind(null, params),
  // );
  eventsData = useAsync(getEvents.bind(null, params));
  console.log('OUTPUT: HomePage -> eventsData', eventsData);

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
  // useEffect(() => {
  const deleteEventFunction = (id) => {
    delEvent(id).then(() => {
      setEventsData({
        value: {
          items: [...eventsData.value.items.filter((event) => event.id !== id)],
        },
      });
    });
    console.log(
      'OUTPUT: deleteEventFunction -> eventsData.value',
      eventsData.value,
    );
  };
  // });

  const addEventFunction = (body) => {
    addEvent(body).then((newEvent) => {
      console.log('OUTPUT: addEventFunction -> newEvent', newEvent);

      setEventsData({
        value: {
          items: [...eventsData.value.items, newEvent], // eventsData.value.items.push(newEvent),
        },
      });
      console.log(
        'OUTPUT: addEventFunction -> eventsData.value',
        eventsData.value,
      );
    });
  };

  return (
    <div>
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
          <button onClick={handleSubmit} name="nextDay" className={style.btn}>
            Next 24 Hours
          </button>
          <button onClick={handleSubmit} name="next7Days" className={style.btn}>
            Next 7 days
          </button>
          <button
            onClick={handleSubmit}
            name="next30Days"
            className={style.btn}
          >
            Next 30 days
          </button>
        </div>
        <div>
          <AddEvent addEventFunction={addEventFunction} />
        </div>
      </header>
      <div>
        {eventsData.loading ? (
          <div>Loading...</div>
        ) : displayEvents === 'next7Days' ? (
          <EventList
            events={eventsData.value}
            displayEvents="next7Days"
            deleteEventFunction={deleteEventFunction}
          />
        ) : displayEvents === 'next30Days' ? (
          <EventList
            events={eventsData.value}
            displayEvents="next30Days"
            deleteEventFunction={deleteEventFunction}
          />
        ) : (
          <EventList
            events={eventsData.value}
            displayEvents="nextDay"
            deleteEventFunction={deleteEventFunction}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
