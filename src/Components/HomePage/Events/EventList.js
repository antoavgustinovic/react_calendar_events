/* eslint-disable no-unused-vars */
import React from 'react';
import Event from './Event';

function EventList({ events, displayEvents, deleteEventFunction }) {
  console.log('OUTPUT: EventList -> events', events);
  let sortedEvents;

  let currTime = new Date();
  let nextDay = new Date();
  let next7Days = new Date();
  let next30Days = new Date();
  nextDay.setDate(currTime.getDate() + 1);
  next7Days.setDate(currTime.getDate() + 7);
  next30Days.setDate(currTime.getDate() + 31);

  // Function for filtering events based on $displayEvents
  const filterEventsFunction = (endTime) => {
    return events.items.filter((event) =>
      event.start.dateTime
        ? event.start.dateTime >= currTime.toISOString() &&
          event.end.dateTime <= endTime.toISOString()
        : event.start.date >= currTime.toISOString() &&
          event.end.date <= endTime.toISOString(),
    );
  };

  if (displayEvents === 'next7Days')
    sortedEvents = filterEventsFunction(next7Days);
  else if (displayEvents === 'next30Days')
    sortedEvents = filterEventsFunction(next30Days);
  else sortedEvents = filterEventsFunction(nextDay);

  return sortedEvents.map((event) => (
    <Event
      key={event.id}
      event={event}
      deleteEventFunction={deleteEventFunction}
    />
  ));
}

export default EventList;
