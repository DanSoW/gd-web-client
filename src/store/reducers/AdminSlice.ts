/* Библиотеки */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IArticleModel, IDoorModel } from "src/models/IDoorModel";

/* Локальные интерфейсы */
interface IAdminSlice {
  doors: IDoorModel[];
  isLoading: boolean;
}

/* Базовое состояние текущего слайса */
const initialState: IAdminSlice = {
  doors: [],
  isLoading: false,
};

export const adminSlice = createSlice({
  name: "admin_slice",
  initialState,
  reducers: {
    loadingStart(state: IAdminSlice) {
      state.isLoading = true;
    },

    loadingEnd(state: IAdminSlice) {
      state.isLoading = false;
    },

    clear(state: IAdminSlice) {
      state.doors = [];
      state.isLoading = false;
    },

    addDoor(state: IAdminSlice, action: PayloadAction<IDoorModel[]>) {
      if (action.payload && state.doors) {
        state.doors = state.doors.concat(action.payload || []);
      }
    },

    addArticle(
      state: IAdminSlice,
      action: PayloadAction<{ doors_id: number; article: IArticleModel }>
    ) {
      const findIndex = state.doors.findIndex(
        (item) => item.id === action.payload.doors_id
      );
      if (findIndex >= 0) {
        state.doors[findIndex].articles.push(action.payload.article);
      }
    },

    deleteArticle(
      state: IAdminSlice,
      action: PayloadAction<{ doors_id: number; articles_id: number }>
    ) {
      const findIndex = state.doors.findIndex(
        (item) => item.id === action.payload.doors_id
      );

      if (findIndex >= 0) {
        const findIndexArticle = state.doors[findIndex].articles.findIndex(
          (item) => item.id === action.payload.articles_id
        );
        if (findIndexArticle >= 0) {
          if (state.doors[findIndex].articles.length > 1) {
            console.log(findIndexArticle);
            state.doors[findIndex].articles = state.doors[
              findIndex
            ].articles.splice(findIndexArticle, 1);
          } else {
            state.doors[findIndex].articles = [];
          }
        }
      }
    },

    setDoors(state: IAdminSlice, action: PayloadAction<IDoorModel[]>) {
      if (action.payload) {
        state.doors = action.payload || [];
      }
    },
  },
});

export default adminSlice.reducer;
