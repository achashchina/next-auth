import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import customer from './customer';
import customerEvents from './customer-events';
import activePage from './activePage';
import lossList from './loss-list';
import costList from './cost-list';

const reducer = combineReducers({
  customer,
  activePage,
  customerEvents,
  lossList,
  costList
});

const store = configureStore({
  reducer,
});
export default store;
