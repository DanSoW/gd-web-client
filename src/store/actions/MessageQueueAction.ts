/* Библиотеки */
import { v4 as uuidv4 } from 'uuid';

/* Контекст */
import { messageQueueSlice } from "../reducers/MessageQueueSlice";

/* DTO */
import ApiResponseDto from 'src/dtos/api.response-dto';
import { empty } from 'src/types/empty';

const addMessage = (
  response: empty | { status: number, data: { message?: string | undefined } },
  type: string,
  message: string | undefined | null = null
) => async (dispatch: any) => {
    if (response || message) {
        dispatch(messageQueueSlice.actions.addMessage({
            ...(new ApiResponseDto({
                uuid: uuidv4(),
                data: {
                    message: (message) ? message : response?.data.message
                },
                status: (response) ? response.status : 200,
                type: type,
                created_at: (new Date()).toUTCString()
            }))
        }));
    }
}

const removeMessage = (uuid: string) => async (dispatch: any) => {
    dispatch(messageQueueSlice.actions.removeMessage(uuid));
}

const errorMessage = (
  e: undefined | { response: { status: number, data: { message?: string | undefined } } }
) => async (dispatch: any) => {
    if (e?.response?.data?.message) {
        dispatch(messageQueueSlice.actions.addMessage({
            ...(new ApiResponseDto({
                uuid: uuidv4(),
                data: {
                    message: e.response.data.message
                },
                status: (e?.response?.status)? e?.response?.status : 400,
                type: "error",
                created_at: (new Date()).toUTCString()
            }))
        }));
    } else {
        dispatch(messageQueueSlice.actions.addMessage({
            ...(new ApiResponseDto({
                uuid: uuidv4(),
                data: {
                    // @ts-ignore
                    message: e.message
                },
                status: 400,
                type: "error",
                created_at: (new Date()).toUTCString()
            }))
        }));
    }
}

const messageQueueAction = {
    removeMessage,
    addMessage,
    errorMessage,
};

export default messageQueueAction;