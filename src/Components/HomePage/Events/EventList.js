/* eslint-disable no-unused-vars */
import React from 'react';
import Event from './Event';

function EventList({ events, today, thisWeek = '', thisMonth = '' }) {
  console.log('OUTPUT: EventList -> thisMonth', thisMonth);
  console.log('OUTPUT: EventList -> today', today);
  console.log('OUTPUT: EventList -> thisWeek', thisWeek);
  console.log('OUTPUT: EventList -> events', events);

  let sortedEvents;
  const sortedEventsFunction = (timeSpan) => {
    return events.items.filter((event) =>
      event.start.dateTime
        ? event.start.dateTime >= today.toISOString() &&
          event.end.dateTime <= timeSpan.toISOString()
        : event.start.date >= today.toISOString() &&
          event.end.date <= timeSpan.toISOString(),
    );
  };

  if (thisWeek) sortedEvents = sortedEventsFunction(thisWeek);
  else if (thisMonth) sortedEvents = sortedEventsFunction(thisMonth);
  else sortedEvents = sortedEventsFunction(today);

  console.log('OUTPUT: EventList -> sortedEvents', sortedEvents);

  return sortedEvents.map((event) => <Event key={event.id} event={event} />);
}

export default EventList;
