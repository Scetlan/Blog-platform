import { configureStore } from '@reduxjs/toolkit';
import fetchReducer from './reducer/fetchSlice';

const store = configureStore({
  reducer: {
    fetch: fetchReducer,
  },
});

export default store;