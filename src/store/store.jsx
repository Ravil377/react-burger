import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../services/reducers/index';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;