import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import customer from './customer';
import activePage from './activePage';

const reducer = combineReducers({
  customer,
  activePage
});
const store = configureStore({
  reducer,
});
export default store;
