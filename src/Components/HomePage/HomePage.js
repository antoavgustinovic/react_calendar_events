/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useAsync, useSetState } from 'react-use';
import style from './HomePage.module.css';
import { getEvents, addEvent, delEvent } from './../../services/api';
import EventList from './Events/EventList';
import EventGroupList from './Events/EventGroupList';
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

  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetching events
  useEffect(() => {
    setLoading(true);
    getEvents(params).then((res) => {
      setEventsData(res);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log('OUTPUT: HomePage -> eventsData', eventsData);

  // determining time span to display
  const [displayEvents, setDisplayEvents] = useState('next7Days');
  const handleSubmit = (event) => {
    setDisplayEvents(event.target.name);
  };

  // Delete event
  const deleteEventFunction = (id) => {
    delEvent(id).then(() => {
      // This should remove event from array but it doesn't (should rerender too)
      setEventsData([...eventsData.filter((event) => event.id !== id)]);
    });
  };

  // Create new event
  const addEventFunction = (body) => {
    addEvent(body).then((newEvent) => {
      // console.log('OUTPUT: addEventFunction -> newEvent', newEvent);
      // This should add event to a array but it doesn't (should rerender too)
      setEventsData(
        [...eventsData, newEvent].sort((a, b) =>
          b.start.dateTime && a.start.dateTime
            ? a.start.dateTime.localeCompare(b.start.dateTime)
            : b.start.date && a.start.date
            ? a.start.date.localeCompare(b.start.date)
            : b.start.dateTime && a.start.date
            ? a.start.date.localeCompare(b.start.dateTime)
            : a.start.dateTime.localeCompare(b.start.date),
        ),
      );
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
        {loading ? (
          <div>Loading...</div>
        ) : (
          // <EventGroupList
          //   events={eventsData}
          //   displayEvents={displayEvents}
          //   deleteEventFunction={deleteEventFunction}
          // />
          <EventList
            events={eventsData}
            displayEvents={displayEvents}
            deleteEventFunction={deleteEventFunction}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
