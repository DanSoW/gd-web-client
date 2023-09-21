/* Библиотеки */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDoorModel } from "src/models/IDoorModel";

/* Локальные интерфейсы */
interface IUserSlice {
  count: number;
  doors: IDoorModel[];
  isLoading: boolean;
}

/* Базовое состояние текущего слайса */
const initialState: IUserSlice = {
  count: 0,
  doors: [],
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user_slice",
  initialState,
  reducers: {
    loadingStart(state: IUserSlice) {
      state.isLoading = true;
    },

    loadingEnd(state: IUserSlice) {
      state.isLoading = false;
    },

    clear(state: IUserSlice) {
      state.doors = [];
      state.count = 0;
      state.isLoading = false;
    },

    addCompany(
      state: IUserSlice,
      action: PayloadAction<{ doors: IDoorModel[]; count: number }>
    ) {
      if (action.payload && state.doors) {
        state.doors = state.doors.concat(action.payload.doors || []);
      }
    },

    initCompanies(
      state: IUserSlice,
      action: PayloadAction<{ doors: IDoorModel[]; count: number }>
    ) {
      if (action.payload) {
        state.doors = action.payload.doors || [];
      }
    },
  },
});

export default userSlice.reducer;
