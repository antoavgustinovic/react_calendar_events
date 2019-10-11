/* eslint-disable no-unused-vars */
import React from 'react';
import style from './Event.module.css';

function formatTime(date) {
  const hours = date.substring(11, 13);
  const minutes = date.substring(14, 16);
  return `${hours}:${minutes}`;
}

function formatDate(date) {
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);
  return `${day}.${month}.${year}`;
}

function Event({ event, deleteEventFunction }) {
  return (
    <div className={style.block}>
      {event.summary}{' '}
      <button
        onClick={deleteEventFunction.bind(this, event.id)}
        className={style.btnStyle}
      >
        x
      </button>
      <div>
        <h4>
          {event.start.dateTime ? formatDate(event.start.dateTime) : ''}{' '}
          {event.start.dateTime && event.end.dateTime
            ? `${formatTime(event.start.dateTime)}-${formatTime(
                event.end.dateTime,
              )}`
            : `${formatDate(event.start.date)}- ${formatDate(event.end.date)}`}
        </h4>
      </div>
    </div>
  );
}

export default Event;
