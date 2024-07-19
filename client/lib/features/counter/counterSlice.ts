import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TravellerState {
  adult: number;
  children: number;
  infants: number;
}

const initialState: TravellerState = {
  adult: 1,
  children: 0,
  infants: 0,
};

const travellerSlice = createSlice({
  name: 'traveller',
  initialState,
  reducers: {
    increment(state, action: PayloadAction<string>) {
      if (action.payload === 'adult') {
        state.adult++;
      } else if (action.payload === 'children') {
        state.children++;
      } else if (action.payload === 'infants') {
        state.infants++;
      }
    },
    decrement(state, action: PayloadAction<string>) {
      if (action.payload === 'adult' && state.adult > 1) {
        state.adult--;
      } else if (action.payload === 'children' && state.children > 0) {
        state.children--;
      } else if (action.payload === 'infants' && state.infants > 0) {
        state.infants--;
      }
    },
  },
});

export const { increment, decrement } = travellerSlice.actions;

export default travellerSlice.reducer;
