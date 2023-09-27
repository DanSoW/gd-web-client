import { createSlice } from "@reduxjs/toolkit";

export interface IFilterInfoSlice {
  url: string;
  isLoading: boolean;
}

// Базовое состояние слайса
const initialState: IFilterInfoSlice = {
  url: "",
  isLoading: false,
};

export const filterInfoSlice = createSlice({
  name: "filter_info",
  initialState,
  reducers: {
    loadingStart(state) {
      state.isLoading = true;
    },

    loadingEnd(state) {
      state.isLoading = false;
    },

    setUrl(state, action) {
      state.url = action.payload.url;
    },

    clear(state) {
      state.isLoading = false;
    },
  },
});

export default filterInfoSlice.reducer;
