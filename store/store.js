import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import customer from './customer';
import customerEvents from './customer-events';
import activePage from './activePage';
import lossList from './loss-list';

const reducer = combineReducers({
  customer,
  activePage,
  customerEvents,
  lossList,
});

const store = configureStore({
  reducer,
});
export default store;
