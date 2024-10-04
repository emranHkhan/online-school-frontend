import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://online-school-backend.onrender.com/api/',
    // baseURL: 'http://127.0.0.1:8000/api/'
    baseURL: 'https://online-school-backend.vercel.app/api/'
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;
