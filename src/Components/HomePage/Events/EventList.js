/* eslint-disable no-unused-vars */
import React from 'react';
import Event from './Event';

function EventList({
  events,
  currTime,
  next7Days = '',
  next30Days = '',
  nextDay = '',
}) {
  let sortedEvents;
  //   let startDay = new Date();
  //   let endDay = new Date();
  //   startDay.setHours(0, 0, 0, 0);
  //   endDay.setHours(23, 59, 59, 999);

  const sortedEventsFunction = (endTime) => {
    return events.items.filter((event) =>
      event.start.dateTime
        ? event.start.dateTime >= currTime.toISOString() &&
          event.end.dateTime <= endTime.toISOString()
        : event.start.date >= currTime.toISOString() &&
          event.end.date <= endTime.toISOString(),
    );
  };

  if (next7Days) sortedEvents = sortedEventsFunction(next7Days);
  else if (next30Days) sortedEvents = sortedEventsFunction(next30Days);
  else sortedEvents = sortedEventsFunction(nextDay);

  return sortedEvents.map((event) => <Event key={event.id} event={event} />);
}

export default EventList;
