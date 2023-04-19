export const initialState = {
  events: [],
  isEventsLoaded: false,
};

import { createSlice } from '@reduxjs/toolkit';
// Slice
const slice = createSlice({
  name: 'customer-events',
  initialState,
  reducers: {
    getAllEvents: (state, action) => {
      state.events = [...action.payload];
      state.isEventsLoaded = true;
      // console.log(JSON.parse(JSON.stringify(state)));

    },
    resetIsEventsLoaded: (state, action) => {
      state.isEventsLoaded = false;
    },
  },
});
export default slice.reducer;

// Actions
const { getAllEvents, resetIsEventsLoaded } = slice.actions;

export const getEventsList = () => async (dispatch) => {
  try {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await fetch('/api/customers/events', options);
    const data = await res.json();
    if (data.status) {
      dispatch(getAllEvents(data.response));
    }
  } catch (e) {
    return console.error(e.message);
  }
};

export const clearIsEventsLoadedState = () => async (dispatch) => {
  try {
    return dispatch(resetIsEventsLoaded());
  } catch (e) {
    return console.error(e.message);
  }
};
