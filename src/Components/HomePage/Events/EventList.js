/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import Event from './Event';
import style from './EventList.module.css';

function EventList({ events, deleteEventFunction }) {
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
