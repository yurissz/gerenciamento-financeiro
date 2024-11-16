import axios from 'axios';

const token = localStorage.getItem('token');

const api = axios.create({
    baseURL: 'https://desafio-front-modulo4-next-parteback-v3-fc90.onrender.com',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default api;