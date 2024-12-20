import { createReducer } from "@reduxjs/toolkit";

const initialState = { token: ""};

export const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("setToken", (state, action) => {
      state.token = action.payload;
    });
});
