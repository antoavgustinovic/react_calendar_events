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

function Event({ id, event }) {
  //   return <div></div>;
  return (
    <div>
      {event.summary}{' '}
      <div>
        <h4>
          {formatDate(event.start.dateTime)}{' '}
          <h5>
            {formatTime(event.start.dateTime)}-{formatTime(event.end.dateTime)}
          </h5>
        </h4>
      </div>
      <hr />
    </div>
  );
}

export default Event;
