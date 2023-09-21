import apiMainServer from "src/http/http";
import { adminSlice } from "../reducers/AdminSlice";
import messageQueueAction from "./MessageQueueAction";
import AdminApi from "src/constants/admin-api";
import { IArticleValues, IDoorValues } from "src/models/IDoorModel";

const doorGetAll = () => async (dispatch: any) => {
  dispatch(adminSlice.actions.loadingStart());

  try {
    const response = await apiMainServer.get(AdminApi.DOOR_GET_ALL);

    if (response.status != 200 && response.status != 201) {
      dispatch(messageQueueAction.addMessage(response.data.message, "error"));
      return;
    }

    dispatch(adminSlice.actions.setDoors(response.data));
  } catch (e: any) {
    dispatch(messageQueueAction.errorMessage(e));
  }

  dispatch(adminSlice.actions.loadingEnd());
};

const doorAdd =
  (
    values: IDoorValues,
    imageEntry: Array<{ data_url: string; file: File }>,
    imageExit: Array<{ data_url: string; file: File }>,
    cb: () => void
  ) =>
  async (dispatch: any) => {
    dispatch(adminSlice.actions.loadingStart());

    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("image_entry", imageEntry[0].file);
      formData.append("image_exit", imageExit[0].file);

      const response = await apiMainServer.post(AdminApi.DOOR_ADD, formData);

      if (response.status != 200 && response.status != 201) {
        dispatch(messageQueueAction.addMessage(response.data.message, "error"));
        return;
      }

      cb();
    } catch (e: any) {
      dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(adminSlice.actions.loadingEnd());
  };

const doorCharacteristicDelete =
  (doors_id: number, articles_id: number, cb: () => void) =>
  async (dispatch: any) => {
    dispatch(adminSlice.actions.loadingStart());

    try {
      const response = await apiMainServer.post(
        AdminApi.DOOR_CHARACTERISTIC_DELETE,
        JSON.stringify({
          doors_id: doors_id,
          articles_id: articles_id,
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

      dispatch(doorGetAll());
      cb();
    } catch (e: any) {
      dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(adminSlice.actions.loadingEnd());
  };

const doorDelete =
  (doors_id: number, cb: () => void) => async (dispatch: any) => {
    dispatch(adminSlice.actions.loadingStart());

    try {
      const response = await apiMainServer.post(
        AdminApi.DOOR_DELETE,
        JSON.stringify({
          doors_id: doors_id,
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

      dispatch(doorGetAll());
      cb();
    } catch (e: any) {
      dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(adminSlice.actions.loadingEnd());
  };

/**
 * Добавление нового артикула
 * @param values Данные с формы
 * @param images Изображения
 * @param cb Callback
 * @returns
 */
const doorCharacteristicAdd =
  (
    doors_id: number,
    values: IArticleValues,
    images: Array<{ data_url: string; file: File }>,
    cb: () => void
  ) =>
  async (dispatch: any) => {
    dispatch(adminSlice.actions.loadingStart());

    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      // @ts-ignore
      formData.append("doors_id", doors_id);
      // @ts-ignore
      formData.append("width", values.width);
      // @ts-ignore
      formData.append("height", values.height);
      // @ts-ignore
      formData.append("opening_direction", values.opening_direction);
      // @ts-ignore
      formData.append("main_lock", values.main_lock);
      // @ts-ignore
      formData.append("additional_lock", values.additional_lock);
      // @ts-ignore
      formData.append("door_leaf_thickness", values.door_leaf_thickness);
      // @ts-ignore
      formData.append("sealing_contours", values.sealing_contours);
      formData.append("color", values.color);
      formData.append("target", values.target);
      // @ts-ignore
      formData.append("mirror", values.mirror);
      // @ts-ignore
      formData.append("price", values.price);
      // @ts-ignore
      formData.append("price_without_discount", values.price_without_discount);
      // @ts-ignore
      formData.append("discount", values.discount);
      // @ts-ignore
      formData.append("in_stock", values.in_stock);

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i].file);
      }

      const response = await apiMainServer.post(
        AdminApi.DOOR_CHARACTERISTIC_ADD,
        formData
      );

      if (response.status != 200 && response.status != 201) {
        dispatch(messageQueueAction.addMessage(response.data.message, "error"));
        return;
      }

      dispatch(
        adminSlice.actions.addArticle({
          doors_id: doors_id,
          article: response.data,
        })
      );
      cb();
    } catch (e: any) {
      dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(adminSlice.actions.loadingEnd());
  };

const doorEdit =
  (
    doors_id: number,
    data: IDoorValues,
    imageEntry: File | null,
    imageExit: File | null,
    cb: () => void
  ) =>
  async (dispatch: any) => {
    dispatch(adminSlice.actions.loadingStart());

    try {
      const response = await apiMainServer.post(
        AdminApi.DOOR_INFO_EDIT,
        JSON.stringify({
          doors_id: doors_id,
          ...data,
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

      if (imageEntry) {
        const formData = new FormData();
        // @ts-ignore
        formData.append("doors_id", doors_id);
        formData.append("image_entry", imageEntry);

        const localResponse = await apiMainServer.post(
          AdminApi.DOOR_IMAGE_ENTRY_EDIT,
          formData
        );
      }

      if (imageExit) {
        const formData = new FormData();
        // @ts-ignore
        formData.append("doors_id", doors_id);
        formData.append("image_exit", imageExit);

        const localResponse = await apiMainServer.post(
          AdminApi.DOOR_IMAGE_EXIT_EDIT,
          formData
        );
      }

      dispatch(doorGetAll());
      cb();
    } catch (e: any) {
      dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(adminSlice.actions.loadingEnd());
  };

const doorCharacteristicEdit =
  (
    doors_id: number,
    articles_id: number,
    data: IArticleValues,
    saveImages: any,
    deleteImages: any,
    cb: () => void
  ) =>
  async (dispatch: any) => {
    dispatch(adminSlice.actions.loadingStart());

    try {
      const response = await apiMainServer.post(
        AdminApi.DOOR_CHARACTERISTIC_INFO_EDIT,
        JSON.stringify({
          doors_id: doors_id,
          articles_id: articles_id,
          ...data,
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

      // Добавление новых изображений к объекту
     /* if (saveImages && !(response.status != 200 && response.status != 201)) {
        for (let i = 0; i < saveImages.length; i++) {
          const img = saveImages[i].file;

          const formData = new FormData();
          // @ts-ignore
          formData.append("articles_id", articles_id);
          formData.append("file", img);

          const localResponse = await apiMainServer.post(
            AdminApi.DOOR_CHARACTERISTIC_IMAGE_ADD,
            formData
          );
        }
      }

      // Удаление старых изображений объекта
      if (deleteImages && !(response.status != 200 && response.status != 201)) {
        for (let i = 0; i < deleteImages.length; i++) {
          const img = deleteImages[i];
          const local = {
            articles_id: articles_id,
            image: img
          };

          const localResponse = await apiMainServer.post(
            AdminApi.DOOR_CHARACTERISTIC_IMAGE_DELETE,
            JSON.stringify(local)
          );
        }
      }*/

      dispatch(adminSlice.actions.setDoors([]));
      dispatch(doorGetAll());
      cb();
    } catch (e: any) {
      dispatch(messageQueueAction.errorMessage(e));
    }

    dispatch(adminSlice.actions.loadingEnd());
  };

const AdminAction = {
  doorGetAll: doorGetAll,
  doorAdd: doorAdd,
  doorCharacteristicAdd: doorCharacteristicAdd,
  doorCharacteristicDelete: doorCharacteristicDelete,
  doorDelete: doorDelete,
  doorEdit: doorEdit,
  doorCharacteristicEdit: doorCharacteristicEdit,
};

export default AdminAction;
