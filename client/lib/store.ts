import { configureStore } from '@reduxjs/toolkit';
import travellerReducer from '@/lib/features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    traveller: travellerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
