import { GET_EVENTS, ADD_EVENT, DEL_EVENT } from './../actions/types';

const initialState = {
  items: [],
  addedItem: {},
  deletedItem: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
      return {
        ...state,
        items: action.payload,
      };
    case ADD_EVENT:
      return {
        ...state,
        addedItem: action.payload,
      };
    case DEL_EVENT:
      return {
        ...state,
        deletedItem: action.payload,
      };
    default:
      return state;
  }
}
