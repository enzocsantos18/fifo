import axios from 'axios';
import Auth from './auth';

const api = axios.create({
    baseURL: 'http://localhost:3333/',
});

api.interceptors.request.use(
    async config => {
        if (Auth.hasToken()) {
            config.headers['Authorization'] = 'Bearer ' + Auth.getToken();
        }

        return config;
    },
    error => {
        Promise.reject(error);
    }
);

export default api;
