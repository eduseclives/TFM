import axios from 'axios';
import { authUtils } from './auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8091';

const apiClient = axios.create({
    baseURL: API_URL,
});

// Request Interceptor: Add Token
apiClient.interceptors.request.use(
    (config) => {
        const token = authUtils.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 and Auto-Logout
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn('Session expired or unauthorized. Logging out...');
            authUtils.clearSession();
            window.location.href = '/'; // Redirect to login
        }
        return Promise.reject(error);
    }
);

export default apiClient;
