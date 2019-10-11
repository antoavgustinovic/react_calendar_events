/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import Event from './Event';
import style from './EventList.module.css';

function EventList({ events, deleteEventFunction }) {
  console.log('OUTPUT: EventList -> events', events);
  //   let filteredEvents;

  //   let currTime = new Date();
  //   let nextDay = new Date();
  //   let next7Days = new Date();
  //   let next30Days = new Date();
  //   nextDay.setDate(currTime.getDate() + 1);
  //   next7Days.setDate(currTime.getDate() + 7);
  //   next30Days.setDate(currTime.getDate() + 31);

  //   // Function for filtering events based on $displayEvents
  //   const filterEventsFunction = (endTime) => {
  //     return events.filter((event) =>
  //       event.start.dateTime
  //         ? event.start.dateTime >= currTime.toISOString() &&
  //           event.end.dateTime <= endTime.toISOString()
  //         : event.start.date >= currTime.toISOString() &&
  //           event.end.date <= endTime.toISOString(),
  //     );
  //   };

  //   if (displayEvents === 'next7Days')
  //     filteredEvents = filterEventsFunction(next7Days);
  //   else if (displayEvents === 'next30Days')
  //     filteredEvents = filterEventsFunction(next30Days);
  //   else filteredEvents = filterEventsFunction(nextDay);

  return (
    <Fragment>
      <div className={style.list}>
        {events.map((event) => (
          <Event
            key={event.id}
            event={event}
            deleteEventFunction={deleteEventFunction}
          />
        ))}
      </div>
    </Fragment>
  );
}

export default EventList;
