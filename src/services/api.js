export function get(model = '') {
  return fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events/${model}`,
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
