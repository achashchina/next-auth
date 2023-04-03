export const initialState = {
  customerList: [],
  isCustomersLoaded: false,
  selectedCustomer: null,
};

import { createSlice } from '@reduxjs/toolkit';
// Slice
const slice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    getAllCustomers: (state, action) => {
      // console.log(JSON.parse(JSON.stringify(state)));
      state.customerList = action.payload.customerList.map((c) => ({ ...c }));
      state.isCustomersLoaded = true;
    },
    resetIsCustomersLoaded: (state, action) => {
      state.isCustomersLoaded = false;
    },
    selectCustomer: (state, action) => {
      state.selectedCustomer = action.payload ? state.customerList.find((c) => c._id === action.payload) : null;
    },
  },
});
export default slice.reducer;

// Actions
const { getAllCustomers, resetIsCustomersLoaded, selectCustomer } = slice.actions;
export const getCustomersList = () => async (dispatch) => {
  try {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await fetch('/api/customers-list', options);
    const data = await res.json();
    dispatch(getAllCustomers({ customerList: data.list }));
  } catch (e) {
    return console.error(e.message);
  }
};

export const clearIsCustomersLoadedState = () => async (dispatch) => {
  try {
    return dispatch(resetIsCustomersLoaded());
  } catch (e) {
    return console.error(e.message);
  }
};

export const selectCustomerAction = (id) => async (dispatch) => {
  try {
    return dispatch(selectCustomer(id));
  } catch (e) {
    return console.error(e.message);
  }
};
