/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import Event from './Event';
import style from './EventList.module.css';

function EventList7Days({ events, deleteEventFunction }) {
  let currTime = new Date();
  let endDay = new Date();
  let day1 = new Date();
  let day7 = new Date();
  let currMonth = new Date().getMonth() + 1;
  let currYear = new Date().getFullYear();
  endDay.setHours(23, 59, 59, 999);
  console.log('OUTPUT: functionEventList7Days -> endDay', endDay);
  day1.setDate(currTime.getDate() + 1);
  day7.setDate(currTime.getDate() + 7);
  console.log('OUTPUT: functionEventList7Days -> next7Days', day7);

  // Function for filtering events based on $displayEvents
  const filterEventsFunction = (day, end) => {
    console.log('OUTPUT: filterEventsFunction -> day', day);
    end.setHours(23, 59, 59, 999);
    console.log('OUTPUT: filterEventsFunction -> end', end);
    return events.items.filter((event) =>
      event.start.dateTime
        ? event.start.dateTime >= day.toISOString() &&
          event.end.dateTime <= end.toISOString()
        : event.start.date >= day.toISOString() &&
          event.end.date <= end.toISOString(),
    );
  };

  const filteredEvents1 = filterEventsFunction(currTime, endDay);
  const filteredEvents = filterEventsFunction(currTime, day7);

  return (
    <Fragment>
      <div className={style.list}>
        {/* {sortedEvents.map((event) => (
          <div>
            <label className={style.dayLabel}>
              {currTime.getDate()}.{currTime.getDate()}.{currTime.getFullYear()}
              .
            </label>
            <Event
              key={event.id}
              event={event}
              deleteEventFunction={deleteEventFunction}
            />
          </div>
        ))} */}
        <div>
          <label className={style.dayLabel}>
            {currTime.getDate()}.{currMonth}.{currYear}.
          </label>
          {filteredEvents1.map((event) => (
            <Event
              key={event.id}
              event={event}
              deleteEventFunction={deleteEventFunction}
            />
          ))}
        </div>
        <div>
          <label className={style.dayLabel}>
            {currTime.getDate() + 1}.{currMonth}.{currYear}.
          </label>
          {filteredEvents.map((event) => (
            <Event
              key={event.id}
              event={event}
              deleteEventFunction={deleteEventFunction}
            />
          ))}
        </div>
        <div>
          <label className={style.dayLabel}>
            {currTime.getDate() + 2}.{currMonth}.{currYear}.
          </label>
          {filteredEvents.map((event) => (
            <Event
              key={event.id}
              event={event}
              deleteEventFunction={deleteEventFunction}
            />
          ))}
        </div>
        <div>
          <label className={style.dayLabel}>
            {currTime.getDate() + 3}.{currMonth}.{currYear}.
          </label>
          {filteredEvents.map((event) => (
            <Event
              key={event.id}
              event={event}
              deleteEventFunction={deleteEventFunction}
            />
          ))}
        </div>
        <div>
          <label className={style.dayLabel}>
            {currTime.getDate() + 4}.{currMonth}.{currYear}.
          </label>
          {filteredEvents.map((event) => (
            <Event
              key={event.id}
              event={event}
              deleteEventFunction={deleteEventFunction}
            />
          ))}
        </div>
        <div>
          <label className={style.dayLabel}>
            {currTime.getDate() + 5}.{currMonth}.{currYear}.
          </label>
          {filteredEvents.map((event) => (
            <Event
              key={event.id}
              event={event}
              deleteEventFunction={deleteEventFunction}
            />
          ))}
        </div>
        <div>
          <label className={style.dayLabel}>
            {currTime.getDate() + 6}.{currMonth}.{currYear}.
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

export default EventList7Days;
