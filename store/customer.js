export const initialState = {
  customerList: [],
  isCustomersLoaded: false,
};

import { createSlice } from '@reduxjs/toolkit';
// Slice
const slice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    getAllCustomers: (state, action) => {
      // console.log(JSON.parse(JSON.stringify(state)));
      state.customerList = action.payload.customerList;
      state.isCustomersLoaded = true;
    },
    resetIsCustomersLoaded: (state, action) => {
      state.customerList = [];
      state.isCustomersLoaded = false;
    },
  },
});
export default slice.reducer;

// Actions
const { getAllCustomers, resetIsCustomersLoaded } = slice.actions;
export const getCustomersList = () => async (dispatch) => {
  try {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await fetch('/api/customers-list', options);
    const data = await res.json();
    dispatch(getAllCustomers({ customerList: data.list }))
  } catch (e) {
    return console.error(e.message);
  }
};
export const clearState = () => async (dispatch) => {
  try {
    return dispatch(resetIsCustomersLoaded());
  } catch (e) {
    return console.error(e.message);
  }
};
