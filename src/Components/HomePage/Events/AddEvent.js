import React from 'react';
import { useSetState, useAsync } from 'react-use';
import style from './AddEvent.module.css';

function AddEvent(props) {
  const [state, setState] = useSetState({
    title: 'test 5', //'test 5',
    startDate: '2019-10-08T22:30', //'2019-10-08T18:00',
    endDate: '2019-10-08T23:00', //'2019-10-08T19:00',
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

    props.addEventFunction(body);

    // setState({
    //   title: '',
    //   startDate: '',
    //   endDate: '',
    // });
  };

  return (
    <form onSubmit={onSubmit} className={style}>
      <label>New Event</label>
      <input
        type="text"
        name="title"
        className={style}
        placeholder="Add title ..."
        value={state.title}
        onChange={onChange}
      />
      <input
        type="datetime-local"
        name="startDate"
        className={style}
        value={state.startDate}
        onChange={onChange}
      />
      <input
        type="datetime-local"
        name="endDate"
        className={style}
        value={state.endDate}
        onChange={onChange}
      />
      <input className={style} type="submit" value="Submit" className="btn" />
    </form>
  );
}

export default AddEvent;
