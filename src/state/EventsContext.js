import React, { useState } from 'react';

const EventsContext = React.createContext([{}, () => {}]);

const EventsProvider = (props) => {
  const [state, setState] = useState({
    events: {},
  });
  return (
    <EventsContext.Provider value={[state, setState]}>
      {props.children}
    </EventsContext.Provider>
  );
};

export { EventsContext, EventsProvider };
