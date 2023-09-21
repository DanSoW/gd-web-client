/* Библиотеки */
import axios from "axios";

/* Константы */
import Api from "src/constants/api";
import { refreshAccessToken } from "src/store/actions/AuthAction";
import store from "src/store/store";

/**
 * Создание объекта AxiosInstance, с базовым URL и credentials
 */
const apiMainServer = axios.create({
    withCredentials: true,
    baseURL: Api.MAIN_SERVER
});

apiMainServer.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${store.getState().authReducer.access_token}`;
    return config;
});

apiMainServer.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;

    if ((error.response) 
        && (error.response.status === 401)
        && (error.config)
        && (!error.config._isRetry)) {
        originalRequest._isRetry = true;

        try {
            const response = await apiMainServer.post(`${Api.REFRESH_TOKEN}`, {
                refresh_token: store.getState().authReducer.refresh_token
            }, { withCredentials: true });

            store.dispatch(refreshAccessToken(response.data));
            return apiMainServer.request(originalRequest);
        } catch (e) {
            console.log(e);
        }
    }

    throw error;
});


export default apiMainServer;