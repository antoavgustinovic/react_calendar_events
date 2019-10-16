import { GET_EVENTS, ADD_EVENT, DEL_EVENT } from './types';

export const getEvents = (params) => (dispatch) => {
  const str = Object.entries(params)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');

  return (
    fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?${str}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          Accept: 'application/json',
        },
      },
    )
      .then((response) => response.json())
      //   .then((res) => res.items);
      .then((events) =>
        dispatch({
          type: GET_EVENTS,
          payload: events.items,
        }),
      )
  );
};

export const addEvent = (body) => (dispatch) => {
  return (
    fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      //   .then((res) => res.items);
      .then((event) =>
        dispatch({
          type: ADD_EVENT,
          payload: event,
        }),
      )
  );
};
export const delEvent = (id) => (dispatch) => {
  return (
    fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    )
      .then((response) => response.json())
      //   .then((res) => res.items);
      .then((event) =>
        dispatch({
          type: DEL_EVENT,
          payload: event,
        }),
      )
  );
};
