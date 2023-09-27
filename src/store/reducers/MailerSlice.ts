import { createSlice } from "@reduxjs/toolkit";

export interface IMailerSlice {
  isLoading: boolean;
  isSend: boolean;
}

// Базовое состояние слайса
const initialState: IMailerSlice = {
  isLoading: false,
  isSend: false,
};

export const mailerSlice = createSlice({
  name: "mailer_slice",
  initialState,
  reducers: {
    loadingStart(state) {
      state.isLoading = true;
    },

    loadingEnd(state) {
      state.isLoading = false;
    },

    sendFinal(state) {
      state.isSend = true;
    },

    sendClear(state) {
      state.isSend = false;
    },

    clear(state) {
      state.isLoading = false;
    },
  },
});

export default mailerSlice.reducer;
