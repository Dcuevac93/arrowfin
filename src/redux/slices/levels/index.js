import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  levelsByPrice: {},
};

export const levelsSlice = createSlice({
  name: "levels",
  initialState,
  reducers: {
    upsertLevel: (state, { payload }) => {
      state.levelsByPrice[String(payload.price)] = payload;
    },
  },
  selectors: {
    selectLevelByPrice: (sliceState, price) => sliceState.levelsByPrice[String(price)],
  },
});

// Actions
export const {
  upsertLevel,
} = levelsSlice.actions;

// Selectors
export const { selectLevelByPrice } =
  levelsSlice.selectors;

export default levelsSlice.reducer;
