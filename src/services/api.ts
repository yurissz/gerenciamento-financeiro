import axios from 'axios';

const token = localStorage.getItem('token');

const api = axios.create({
    baseURL: 'https://desafio-front-modulo4-next-parteback-v3-fc90.onrender.com',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
});

export default api;