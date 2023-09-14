import { AxiosRequestConfig } from "axios";

export const headers: AxiosRequestConfig<any> = {
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
};