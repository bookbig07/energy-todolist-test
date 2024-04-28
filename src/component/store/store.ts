import { configureStore } from '@reduxjs/toolkit';
import action from './action';

const store = configureStore({
  reducer: {
    todos: action,
  },
});

export default store;
