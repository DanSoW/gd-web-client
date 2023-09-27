import { createSlice } from "@reduxjs/toolkit";
import { IFilterValues } from "src/models/IFilterModel";

export interface IFilterSlice extends IFilterValues {}

// Базовое состояние слайса
const initialState: IFilterSlice = {
  all_sizes: null,
  size780on2000: null,
  size800on2030: null,
  size860on2050: null,
  size900on2050: null,
  size960on2070: null,
  size980on2080: null,
  size1050on2070: null,
  for_apartment: null,
  for_home: null,
  left_opening: null,
  right_opening: null,
  mirror: null,
  without_defect: null,
  outdated_model: null,
  showcase_sample: null,
};

export const filterSlice = createSlice({
  name: "filter_slice",
  initialState,
  reducers: {
    setProperty(state, action) {
      // @ts-ignore
      state[action.payload.property] = action.payload.value;
    },

    clear(state) {
      state.all_sizes = null;
      state.size780on2000 = null;
      state.size800on2030 = null;
      state.size860on2050 = null;
      state.size900on2050 = null;
      state.size960on2070 = null;
      state.size980on2080 = null;
      state.size1050on2070 = null;
      state.for_apartment = null;
      state.for_home = null;
      state.left_opening = null;
      state.right_opening = null;
      state.mirror = null;
      state.without_defect = null;
      state.outdated_model = null;
      state.showcase_sample = null;
    },

    onlySizes(state, action) {
      state.size780on2000 = action.payload.value;
      state.size800on2030 = action.payload.value;
      state.size860on2050 = action.payload.value;
      state.size900on2050 = action.payload.value;
      state.size960on2070 = action.payload.value;
      state.size980on2080 = action.payload.value;
      state.size1050on2070 = action.payload.value;
    },
  },
});

export default filterSlice.reducer;
