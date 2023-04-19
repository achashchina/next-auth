import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import customer from './customer';
import customerEvents from './customer-events';
import activePage from './activePage';

const reducer = combineReducers({
  customer,
  activePage,
  customerEvents
});

const store = configureStore({
  reducer,
});
export default store;
