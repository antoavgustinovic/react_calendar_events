/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import Event from './Event';
import style from './EventList.module.css';

function EventListToday({ events, deleteEventFunction }) {
  let filteredEvents;

  const currTime = new Date();
  const nextDay = new Date();

  const endDay = new Date();
  endDay.setHours(23, 59, 59, 999);

  const startDay = new Date();
  startDay.setHours(0, 0, 0, 0);

  const currMonth = new Date().getMonth() + 1;
  const currYear = new Date().getFullYear();
  nextDay.setDate(currTime.getDate() + 1);

  // Function for filtering events based on $displayEvents
  const filterEventsFunction = () => {
    return events.items.filter((event) =>
      event.start.dateTime
        ? event.start.dateTime >= startDay.toISOString() &&
          event.end.dateTime <= endDay.toISOString()
        : event.start.date >= startDay.toISOString() &&
          event.end.date <= endDay.toISOString(),
    );
  };

  filteredEvents = filterEventsFunction(nextDay);

  return (
    <Fragment>
      <div className={style.listToday}>
        <div>
          <label className={style.dayLabel}>
            {currTime.getDate()}.{currMonth}.{currYear}.
          </label>
          {filteredEvents.map((event) => (
            <Event
              key={event.id}
              event={event}
              deleteEventFunction={deleteEventFunction}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default EventListToday;
