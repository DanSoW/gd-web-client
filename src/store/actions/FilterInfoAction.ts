/* Контекст */
import messageQueueAction from "./MessageQueueAction";

/* HTTP */
import apiMainServer from "src/http/http";

/* Слайс */
import { filterInfoSlice } from "../reducers/FilterInfoSlice";
import Api from "src/constants/api";
import axios from "axios";
import AdminApi from "src/constants/admin-api";

const getFilterInfo = () => async (dispatch: any) => {
  dispatch(filterInfoSlice.actions.loadingStart());

  try {
    const response = await axios.get(`${Api.MAIN_SERVER}${Api.FILTER_INFO}`);

    if (response.status != 200 && response.status != 201) {
      dispatch(messageQueueAction.addMessage(response.data.message, "error"));
      return;
    }

    dispatch(filterInfoSlice.actions.setUrl(response.data));
  } catch (e: any) {
    dispatch(messageQueueAction.errorMessage(e));
  }

  dispatch(filterInfoSlice.actions.loadingEnd());
};

const filterInfoAdd =
  (image: Array<{ data_url: string; file: File }>) => async (dispatch: any) => {
    dispatch(filterInfoSlice.actions.loadingStart());

    try {
      const formData = new FormData();
      formData.append("image", image[0].file);

      const response = await apiMainServer.post(
        AdminApi.FILTER_INFO_ADD,
        formData
      );

      if (response.status != 200 && response.status != 201) {
        dispatch(messageQueueAction.addMessage(response.data.message, "error"));
        return;
      }

      dispatch(filterInfoSlice.actions.setUrl(response.data));
      dispatch(messageQueueAction.addMessage(null, "success", "Изображение для подсказки размеров изменено!"));
    } catch (e: any) {
      dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(filterInfoSlice.actions.loadingEnd());
  };

const FilterInfoAction = {
  getFilterInfo,
  filterInfoAdd
};

export default FilterInfoAction;
