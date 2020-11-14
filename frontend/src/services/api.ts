import axios from 'axios';
import Auth from './auth';

export default axios.create({
    baseURL: 'http://localhost:3333/',
});

/*axios.interceptors.request.use(
    async config => {
        if (Auth.hasToken()) {
            config.headers['Authorization'] = Auth.getToken();
        }

        return config;
    },
    error => {
        Promise.reject(error);
    }
);*/
