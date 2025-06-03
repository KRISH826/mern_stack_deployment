// import { API_BASE_URL } from '@/config/api';
import { getToken } from '@/lib/token';
import axios from 'axios';

const http = axios.create({
    baseURL: 'http://localhost:3030/api/v1',
    withCredentials: true,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
})

http.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}) 

export default http;
export type HttpResponse<T> = {
    code: number;
    message: string;
    data: T;
}
export type HttpErrorResponse = {
    code: number;
    message: string;
}