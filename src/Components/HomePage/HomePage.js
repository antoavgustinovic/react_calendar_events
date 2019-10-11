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
      setEventsData([...eventsData.filter((event) => event.id !== id)]);
    });
  };

  // Create new event
  const addEventFunction = (body) => {
    addEvent(body).then((newEvent) => {
      // console.log('OUTPUT: addEventFunction -> newEvent', newEvent);
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

  let nextDay = new Date();
  let next7Days = new Date();
  let next30Days = new Date();
  nextDay.setDate(currTime.getDate() + 1);
  next7Days.setDate(currTime.getDate() + 7);
  next30Days.setDate(currTime.getDate() + 31);

  // Function for filtering events based on $displayEvents
  const filterEventsFunction = (displayEvents) => {
    let endTime;
    if (displayEvents === 'next7Days') endTime = next7Days;
    else if (displayEvents === 'next30Days') endTime = next30Days;
    else endTime = nextDay;

    console.log('OUTPUT: filterEventsFunction -> eventsData', eventsData);
    return eventsData.filter((event) =>
      event.start.dateTime
        ? event.start.dateTime >= currTime.toISOString() &&
          event.end.dateTime <= endTime.toISOString()
        : event.start.date >= currTime.toISOString() &&
          event.end.date <= endTime.toISOString(),
    );
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
          // <EventList
          //   events={filterEventsFunction(displayEvents)}
          //   // displayEvents={displayEvents}
          //   deleteEventFunction={deleteEventFunction}
          // />
          <EventGroupList
            events={filterEventsFunction(displayEvents)}
            displayEvents={displayEvents}
            deleteEventFunction={deleteEventFunction}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
