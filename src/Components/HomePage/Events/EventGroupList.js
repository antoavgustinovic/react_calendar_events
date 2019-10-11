import React from 'react';
import EventList from './EventList';
import style from './EventGroupList.module.css';

function EventGroupList({ events, displayEvents, deleteEventFunction }) {
  const groupEventsByNext7Days = () => {
    // gives an object with dates as keys
    const groups = events.reduce((groups, event) => {
      let day;
      let week;
      const options = { weekday: 'long' };

      if (event.start.dateTime) {
        day = new Date(event.start.dateTime);
        if (displayEvents === 'next7Days' || displayEvents === 'nextDay') {
          week = day.getDay();
          week = new Intl.DateTimeFormat('en-US', options).format(day);
        } else {
          const weekNo = getWeekNo(day);
          week = getDateRangeOfWeek(day, weekNo);
        }
      } else {
        day = new Date(event.start.date);
        if (displayEvents === 'next7Days' || displayEvents === 'nextDay') {
          week = day.getDay();
          week = new Intl.DateTimeFormat('en-US', options).format(day);
        } else {
          const weekNo = getWeekNo(day);
          week = getDateRangeOfWeek(day, weekNo);
        }
      }

      if (!groups[week]) {
        groups[week] = [];
      }
      groups[week].push(event);
      return groups;
    }, {});
    console.log('OUTPUT: groups', groups);

    // array Format
    const groupArraysFunc = Object.keys(groups).map((weekDay) => {
      return {
        weekDay,
        events: groups[weekDay],
      };
    });
    console.log('OUTPUT: groupArrays', groupArraysFunc);

    return groupArraysFunc;
  };

  const getWeekNo = (date) => {
    const startDate = new Date(date.getFullYear(), 0);
    let endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    while (endDate.getDay() < 6) endDate.setDate(endDate.getDate() + 1);
    endDate = endDate.getTime();
    let weekNo = 0;
    while (startDate.getTime() < endDate) {
      if (startDate.getDay() == 4) weekNo++;
      startDate.setDate(startDate.getDate() + 1);
    }
    return weekNo;
  };

  const getDateRangeOfWeek = (day, weekNo) => {
    const numOfdaysPastSinceLastMonday = eval(day.getDay() - 1);
    day.setDate(day.getDate() - numOfdaysPastSinceLastMonday);
    const weeksInTheFuture = eval(weekNo - weekNo);
    day.setDate(day.getDate() + eval(7 * weeksInTheFuture));
    const rangeIsFrom = `${day.getDate()}.${day.getMonth() +
      1}.${day.getFullYear()}`;
    day.setDate(day.getDate() + 6);
    const rangeIsTo = `${day.getDate()}.${day.getMonth() +
      1}.${day.getFullYear()}`;
    return `${rangeIsFrom} - ${rangeIsTo}`;
  };

  return (
    <div>
      {groupEventsByNext7Days().map((day) => (
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
