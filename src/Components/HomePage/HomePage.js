/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSetState } from 'react-use';
import { getEvents, addEvent, delEvent } from './../../services/api';
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
      setEventsData(
        [...eventsData, newEvent].sort(
          ({ start: startA }, { start: startB }) => {
            const aVal = startA.dateTime || startA.date;
            const bVal = startB.dateTime || startB.date;
            return aVal.localeCompare(bVal);
          },
        ),
      );
    });
  };

  // Function for filtering events based on $displayEvents
  const filterEventsFunction = (displayEvents) => {
    const endTime = new Date();

    if (displayEvents === 'next7Days') {
      endTime.setDate(currTime.getDate() + 7);
    } else if (displayEvents === 'next30Days') {
      endTime.setDate(currTime.getDate() + 31);
    } else {
      endTime.setDate(currTime.getDate() + 1);
    }

    return eventsData.filter((event) => {
      let start;
      let end;
      event.start.dateTime
        ? (start = new Date(event.start.dateTime))
        : (start = new Date(event.start.date));
      event.end.dateTime
        ? (end = new Date(event.end.dateTime))
        : (end = new Date(event.end.date));

      return (
        start.getTime() >= currTime.getTime() &&
        end.getTime() <= endTime.getTime()
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
