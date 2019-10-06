import React from 'react';
import Event from './Event';

function EventList({ events }) {
  console.log('OUTPUT: EventList -> events', events.items);
  return events.items.map((event) => <Event key={event.id} event={event} />);
  //   return <div></div>;
}

export default EventList;
