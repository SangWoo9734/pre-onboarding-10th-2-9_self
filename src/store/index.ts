import { configureStore } from '@reduxjs/toolkit';
import { autoCompleteSlice } from './autoCompleteSlice';

const store = configureStore({
  reducer: {
    autoCompleteSlice: autoCompleteSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
