export const initialState = {
    list: [],
  };
  
  import { createSlice } from '@reduxjs/toolkit';
  // Slice
  const slice = createSlice({
    name: 'costList',
    initialState,
    reducers: {
      getAllCosts: (state, action) => {
        // console.log(JSON.parse(JSON.stringify(state)));
        state.list = [ ...action.payload];
      },
    },
  });
  export default slice.reducer;
  
  // Actions
  const { getAllCosts } = slice.actions;
  export const getCostList = () => async (dispatch) => {
    try {
      const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
  
      const res = await fetch('/api/pnl/cost', options);
      const data = await res.json();
  
      if (data.status) {
        dispatch(getAllCosts(data.response));
      }
    } catch (e) {
      return console.error(e.message);
    }
  };
  
  