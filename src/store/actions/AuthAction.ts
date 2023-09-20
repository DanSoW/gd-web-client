/* Контекст */
import { authSlice } from "../reducers/AuthSlice";
import { messageQueueSlice } from "../reducers/MessageQueueSlice";
import messageQueueAction from "./MessageQueueAction";

/* Константы */
import apiMainServer from "src/http/http";
import Api from "src/constants/api";
import { headers } from "src/config/headers";
import { IAuthModel } from "src/models/IAuthModel";
import axios from "axios";

/**
 * Авторизация пользователя
 * @param {*} data Авторизационные данные пользователя
 * @param {*} cb Функция обратного вызова
 * @returns
 */
export const authSignIn =
  (data: { email: string; password: string }, cb: () => void) =>
  async (dispatch: any) => {
    // Изменение состояния loading слайса
    dispatch(authSlice.actions.loadingStart());

    try {
      const response = await axios.post(
        `${Api.MAIN_SERVER}${Api.SIGN_IN}`,
        JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Обработка ошибок
      if (response.status !== 200 && response.status !== 201) {
        dispatch(messageQueueAction.addMessage(response, "error"));
        return;
      }

      dispatch(
        messageQueueAction.addMessage(
          response,
          "success",
          "Успешная авторизация!"
        )
      );

      // Вызов операции для авторизации пользователя в рамках системы управления состоянием
      dispatch(authSlice.actions.signInSuccess(response.data));
      cb();
    } catch (e) {
      // @ts-ignore
      dispatch(messageQueueAction.errorMessage(e));
    } finally {
      dispatch(authSlice.actions.loadingEnd());
    }
  };

/**
 * Регистрация пользователя
 * @param {*} data Авторизационные данные пользователя
 * @param {*} cb Функция обратного вызова
 * @returns
 */
export const authSignUp =
  (data: { email: string; password: string }, cb: () => void) =>
  async (dispatch: any) => {
    // Изменение состояния loading слайса
    dispatch(authSlice.actions.loadingStart());

    try {
      const response = await axios.post(
        `${Api.MAIN_SERVER}${Api.SIGN_UP}`,
        JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Обработка ошибок
      if (response.status !== 200 && response.status !== 201) {
        dispatch(messageQueueAction.addMessage(response, "error"));
        return;
      }

      dispatch(
        messageQueueAction.addMessage(
          response,
          "success",
          "Успешная регистрация нового пользователя!"
        )
      );

      dispatch(authSlice.actions.signUpSuccess(response.data));
      cb();
    } catch (e) {
      // @ts-ignore
      dispatch(messageQueueAction.errorMessage(e));
    } finally {
      dispatch(authSlice.actions.loadingEnd());
    }
  };

/**
 * Обновление авторизационных данных через localStorage
 * @returns
 */
export const authUpdate = () => async (dispatch: any) => {
  try {
    dispatch(authSlice.actions.getAuthData());
  } catch (e) {
    // @ts-ignore
    dispatch(messageQueueAction.errorMessage(e));
  }
};

/**
 * Установка авторизационных данных локально в localStorage
 * @param data Данные для установки
 * @returns
 */
export const setAuthData = (data: IAuthModel) => async (dispatch: any) => {
  try {
    dispatch(authSlice.actions.loadingStart());
    dispatch(authSlice.actions.setAuthData(data));
  } catch (e) {
    // @ts-ignore
    dispatch(messageQueueAction.errorMessage(e));
  }

  dispatch(authSlice.actions.loadingEnd());
};

/**
 * Выход из системы
 * @returns
 */
export const authLogout = () => async (dispatch: any) => {
  try {
    dispatch(authSlice.actions.logout());
  } catch (e) {
    // @ts-ignore
    dispatch(messageQueueAction.errorMessage(e));
  }
};
