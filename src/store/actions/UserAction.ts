/* Контекст */
import messageQueueAction from "./MessageQueueAction";

/* HTTP */
import apiMainServer from "src/http/http";

/* Слайс */
import { userSlice } from "../reducers/UserSlice";
import Api from "src/constants/api";
import axios from "axios";
import { IFilterValues } from "src/models/IFilterModel";

const doorGetAll =
  (
    count = 0,
    limit = 10,
    filterByMin: boolean | null = null,
    filterByMax: boolean | null = null,
    values: IFilterValues | null = null,
    add = false
  ) =>
  async (dispatch: any) => {
    dispatch(userSlice.actions.loadingStart());

    try {
      const response = await axios.post(
        `${Api.MAIN_SERVER}${Api.DOOR_GET_ALL}`,
        JSON.stringify({
          count: count,
          limit: limit,
          filter_by_min_price: filterByMin,
          filter_by_max_price: filterByMax,
          ...values,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status != 200 && response.status != 201) {
        dispatch(messageQueueAction.addMessage(response.data.message, "error"));
        return;
      }

      if (add) {
        dispatch(userSlice.actions.addCompany(response.data));
      } else {
        dispatch(userSlice.actions.initCompanies(response.data));
      }
    } catch (e: any) {
      dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(userSlice.actions.loadingEnd());
  };

const UserAction = {
  doorGetAll,
};

export default UserAction;
