/* Контекст */
import messageQueueAction from "./MessageQueueAction";

/* HTTP */
import apiMainServer from "src/http/http";

/* Слайс */
import { mailerSlice } from "../reducers/MailerSlice";
import Api from "src/constants/api";
import axios from "axios";

const mailerCommonSend =
  (name: string, email: string, phone: string) => async (dispatch: any) => {
    dispatch(mailerSlice.actions.loadingStart());

    try {
      const response = await axios.post(
        `${Api.MAIN_SERVER}${Api.MAILER_COMMON_SEND}`,
        JSON.stringify({
          name: name,
          email: email,
          phone: phone,
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

      dispatch(
        messageQueueAction.addMessage(
          null,
          "success",
          "Форма успешно отправлена!"
        )
      );

      dispatch(mailerSlice.actions.sendFinal());
    } catch (e: any) {
      dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(mailerSlice.actions.loadingEnd());
  };

const mailerOrderSend =
  (
    name: string,
    email: string,
    phone: string,
    door_title: string,
    article_title: string
  ) =>
  async (dispatch: any) => {
    dispatch(mailerSlice.actions.loadingStart());

    try {
      const response = await axios.post(
        `${Api.MAIN_SERVER}${Api.MAILER_ORDER_SEND}`,
        JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          door_title: door_title,
          article_title: article_title,
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

      dispatch(
        messageQueueAction.addMessage(
          null,
          "success",
          "Форма успешно отправлена!"
        )
      );

      dispatch(mailerSlice.actions.sendFinal());
    } catch (e: any) {
      dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(mailerSlice.actions.loadingEnd());
  };

const mailerSendClear = () => async (dispatch: any) => {
  dispatch(mailerSlice.actions.sendClear());
};

const MailerAction = {
  mailerCommonSend,
  mailerOrderSend,
  mailerSendClear,
};

export default MailerAction;
