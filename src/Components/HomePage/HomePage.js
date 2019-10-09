/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useAsync, useSetState } from 'react-use';
import style from './HomePage.module.css';
import { getEvents, addEvent, delEvent } from './../../services/api';
import EventList from './Events/EventList';

import Header from './../Layout/Header';

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

  // fetching events
  eventsData = useAsync(getEvents.bind(null, params));
  console.log('OUTPUT: HomePage -> eventsData', eventsData);

  // determining time span to display
  const [displayEvents, setDisplayEvents] = useState('next7Days');
  const handleSubmit = (event) => {
    setDisplayEvents(event.target.name);
  };

  // Delete event
  const deleteEventFunction = (id) => {
    delEvent(id).then(() => {
      // This should remove event from array but it doesn't (should rerender too)
      setEventsData({
        value: {
          items: [...eventsData.value.items.filter((event) => event.id !== id)],
        },
      });
    });
  };

  // Create new event
  const addEventFunction = (body) => {
    addEvent(body).then((newEvent) => {
      console.log('OUTPUT: addEventFunction -> newEvent', newEvent);
      // This should add event to a array but it doesn't (should rerender too)
      setEventsData({
        value: {
          items: [...eventsData.value.items, newEvent], // eventsData.value.items.push(newEvent),
        },
      });
    });
  };

  return (
    <div>
      <Header
        addEventFunction={addEventFunction}
        handleSubmit={handleSubmit}
        props={props}
      />
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
