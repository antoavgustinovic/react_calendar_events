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

  //   const groups = events.reduce((groups, event) => {
  //     let date;
  //     event.start.dateTime
  //       ? (date = event.start.dateTime.split('T')[0])
  //       : (date = event.start.date.split('T')[0]);

  //     if (!groups[date]) {
  //       groups[date] = [];
  //     }
  //     groups[date].push(event);
  //     return groups;
  //   }, {});
  //   console.log('OUTPUT: groups', groups);

  //   // Edit: to add it in the array format instead
  //   const groupArrays = Object.keys(groups).map((date) => {
  //     return {
  //       date,
  //       event: groups[date],
  //     };
  //   });
  //   console.log('OUTPUT: groupArrays', groupArrays);

  return (
    // <Fragment>
    //   <div className={style.list}>
    //     {groupArrays.map((day) => (
    //       <div>
    //         <div>{day.date}</div>
    //         <Event
    //           key={day.event.id}
    //           event={day.event}
    //           deleteEventFunction={deleteEventFunction}
    //         />
    //       </div>
    //     ))}
    //   </div>
    // </Fragment>
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
