import React from 'react';
import EventList from './EventList';
import style from './EventGroupList.module.css';

function EventGroupList({ events, deleteEventFunction }) {
  // gives an object with dates as keys
  const groups = events.reduce((groups, event) => {
    let day;
    let weekDay;
    const options = { weekday: 'long' };

    if (event.start.dateTime) {
      day = new Date(event.start.dateTime);
      weekDay = day.getDay();
      weekDay = new Intl.DateTimeFormat('en-US', options).format(day);
    } else {
      day = new Date(event.start.date);
      console.log('OUTPUT: day', day);
      weekDay = day.getDay();
      weekDay = new Intl.DateTimeFormat('en-US', options).format(day);
    }
    if (!groups[weekDay]) {
      groups[weekDay] = [];
    }
    groups[weekDay].push(event);
    return groups;
  }, {});
  console.log('OUTPUT: groups', groups);

  // array Format
  const groupArrays = Object.keys(groups).map((weekDay) => {
    return {
      weekDay,
      events: groups[weekDay],
    };
  });
  console.log('OUTPUT: groupArrays', groupArrays);

  return (
    <div>
      {groupArrays.map((day) => (
        <div>
          <div className={style.date}>{day.weekDay}</div>
          <EventList
            // key={day.event.id}
            events={day.events}
            deleteEventFunction={deleteEventFunction}
          />
        </div>
      ))}
    </div>
  );
}

export default EventGroupList;
