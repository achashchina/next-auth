export const initialState = {
  list: [],
};

import { createSlice } from '@reduxjs/toolkit';
// Slice
const slice = createSlice({
  name: 'lossList',
  initialState,
  reducers: {
    getAllLosses: (state, action) => {
      // console.log(JSON.parse(JSON.stringify(state)));
      state.list = [ ...action.payload];
    },
  },
});
export default slice.reducer;

// Actions
const { getAllLosses } = slice.actions;
export const getLossList = () => async (dispatch) => {
  try {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await fetch('/api/pnl/loss', options);
    const data = await res.json();

    if (data.status) {
      const list = data.response.map((item)=> ({...item }))
      dispatch(getAllLosses(list));
    }
  } catch (e) {
    return console.error(e.message);
  }
};

