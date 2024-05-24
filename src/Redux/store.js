import fetchReducer from './reducer/fetchSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    fetch: fetchReducer,
  },
});

export default store;
