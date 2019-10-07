export function get(params) {
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

export function post(model, body, headers) {
  return fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events/${model}`,
    {
      method: 'POST',
      body,
      headers,
    },
  );
}
