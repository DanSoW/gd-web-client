/* Контекст */
import messageQueueAction from "./MessageQueueAction";

/* HTTP */
import apiMainServer from "src/http/http";

/* Слайс */
import { filterSlice } from "../reducers/FilterSlice";

const setProperty =
  (property: string, value: boolean | null) => async (dispatch: any) => {
    try {
      dispatch(
        filterSlice.actions.setProperty({
          property: property,
          value: value,
        })
      );
    } catch (e: any) {
      dispatch(messageQueueAction.errorMessage(e));
    }
  };

const clearFilter = () => async (dispatch: any) => {
  try {
    dispatch(filterSlice.actions.clear());
  } catch (e: any) {
    dispatch(messageQueueAction.errorMessage(e));
  }
};

const setValueOnlySizes = (value: boolean | null) => async (dispatch: any) => {
  try {
    dispatch(
      filterSlice.actions.onlySizes({
        value: value,
      })
    );
  } catch (e: any) {
    dispatch(messageQueueAction.errorMessage(e));
  }
};

const FilterAction = {
  setProperty,
  clearFilter,
  setValueOnlySizes
};

export default FilterAction;
