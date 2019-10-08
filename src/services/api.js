export function getEvents(params) {
  const str = Object.entries(params)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');
  console.log('OUTPUT: get -> params', str);

  return fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events?${str}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        Accept: 'application/json',
      },
    },
  ).then((response) => response.json());
}

export function addEvent(body) {
  console.log('OUTPUT: addEvent -> body', JSON.stringify(body));

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
  );
}
