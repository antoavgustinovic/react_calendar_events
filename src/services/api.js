export function getEvents(params) {
  const str = Object.entries(params)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');

  return fetch(
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
    .then((res) => res.items);
}

export function addEvent(body) {
  return fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  ).then((response) => response.json());
}

export function delEvent(id) {
  return fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    },
  );
}
