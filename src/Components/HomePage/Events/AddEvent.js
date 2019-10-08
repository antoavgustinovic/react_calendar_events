import React from 'react';
import { useSetState, useAsync } from 'react-use';
import { addEvent } from './../../../services/api';

function AddEvent() {
  const [state, setState] = useSetState({
    title: '', //'test 5',
    startDate: '', //'2019-10-08T18:00:00',
    endDate: '', //'2019-10-08T19:00:00',
  });

  const onChange = (e) => setState({ [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    const timeZone = 'Europe/Zagreb';
    const body = {
      start: {
        dateTime: `${state.startDate}:00`,
        timeZone,
      },
      end: {
        dateTime: `${state.endDate}:00`,
        timeZone,
      },
      summary: state.title,
    };

    addEvent(body)
      .then((response) => console.log(response.json()))
      .then((res) => console.log(res));

    // setState({
    //   title: '',
    //   startDate: '',
    //   endDate: '',
    // });
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', paddingTop: '10px' }}>
      <label style={{ paddingRight: '5px', color: 'yellow' }}>New Event</label>
      <input
        type="text"
        name="title"
        style={{ flex: '10', padding: '5px' }}
        placeholder="Add title ..."
        value={state.title}
        onChange={onChange}
      />
      <input
        type="datetime-local"
        name="startDate"
        style={{ flex: '5', padding: '5px' }}
        value={state.startDate}
        onChange={onChange}
      />
      <input
        type="datetime-local"
        name="endDate"
        style={{ flex: '5', padding: '5px' }}
        value={state.endDate}
        onChange={onChange}
      />
      <input
        type="submit"
        value="Submit"
        className="btn"
        style={{ flex: '1' }}
      />
    </form>
  );
}

export default AddEvent;
