import React from 'react';
import { useSetState, useAsync } from 'react-use';
import style from './AddEvent.module.css';

function AddEvent(props) {
  const [state, setState] = useSetState({
    title: 'test', //'test',
    startDate: '2019-10-11T22:30', //'2019-10-10T22:30',
    endDate: '2019-10-11T23:30', //'2019-10-10T22:30',
  });

  const onChange = (e) => setState({ [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!canBeSubmitted()) {
      return;
    }

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

    setState({
      title: '',
      startDate: '',
      endDate: '',
    });
  };

  const canBeSubmitted = () => {
    const { title, startDate, endDate } = state;
    return title.length > 0 && startDate.length > 0 && endDate.length > 0;
  };

  return (
    <form onSubmit={onSubmit}>
      <label className={style.headerLabel}>New Event</label>
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
      <input
        className={style}
        disabled={!canBeSubmitted}
        type="submit"
        value="Submit"
        className="btn"
      />
    </form>
  );
}

export default AddEvent;
