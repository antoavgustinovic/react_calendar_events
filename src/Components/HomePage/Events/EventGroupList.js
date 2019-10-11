import React from 'react';
import EventList from './EventList';
import style from './EventGroupList.module.css';
import moment from 'moment';

const getDateRangeOfWeek = (day) => {
  const weekStart = `${moment(day)
    .startOf('isoweek')
    .get('date')}.${moment(day)
    .startOf('isoweek')
    .get('month') + 1}.${moment(day)
    .startOf('isoweek')
    .get('year')}`;
  const weekEnd = `${moment(day)
    .endOf('isoweek')
    .get('date')}.${moment(day)
    .endOf('isoweek')
    .get('month') + 1}.${moment(day)
    .endOf('isoweek')
    .get('year')}`;

  return `${weekStart} - ${weekEnd}`;
};

function EventGroupList({ events, displayEvents, deleteEventFunction }) {
  const groupEvents = () => {
    // gives an object with dates as keys
    const groups = events.reduce((groups, event) => {
      let day;
      let days_weeks;
      const options = { weekday: 'long' };
      //const weekNo = moment().week();

      if (event.start.dateTime) {
        day = new Date(event.start.dateTime);

        if (displayEvents === 'next7Days' || displayEvents === 'nextDay') {
          days_weeks = day.getDay();
          days_weeks = new Intl.DateTimeFormat('en-US', options).format(day);
        } else {
          days_weeks = getDateRangeOfWeek(day);
        }
      } else {
        day = new Date(event.start.date);

        if (displayEvents === 'next7Days' || displayEvents === 'nextDay') {
          days_weeks = day.getDay();
          days_weeks = new Intl.DateTimeFormat('en-US', options).format(day);
        } else {
          days_weeks = getDateRangeOfWeek(day);
        }
      }

      if (!groups[days_weeks]) {
        groups[days_weeks] = [];
      }
      groups[days_weeks].push(event);
      return groups;
    }, {});

    // array Format
    const groupArrays = Object.keys(groups).map((days) => {
      return {
        days: days,
        events: groups[days],
      };
    });

    return groupArrays;
  };

  return (
    <div>
      {groupEvents().map((day) => {
        return (
          <div key={day.events[0].id + 1}>
            <div className={style.date}>{day.days}</div>
            <EventList
              events={day.events}
              deleteEventFunction={deleteEventFunction}
            />
          </div>
        );
      })}
    </div>
  );
}

export default EventGroupList;
