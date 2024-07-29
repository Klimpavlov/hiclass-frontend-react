import axios from 'axios';
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

// Создаем экземпляр axios
const apiClient = axios.create({
    baseURL: `http://${getLocalhost()}/api`,
});

// Функция для получения нового access token с помощью refresh token
const refreshAccessToken = async () => {
    try {
        const response = await apiClient.post('/Authentication/refresh-token', {
            refreshToken: 'ВАШ_REFRESH_TOKEN',
            deviceToken: ''
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        const newAccessToken = response.data.value.accessToken;
        sessionStorage.setItem('accessToken', newAccessToken);
        return newAccessToken;
    } catch (error) {
        console.error('Unable to refresh access token:', error);
        throw error;
    }
};

// Интерсептор запроса для добавления access token в заголовки
apiClient.interceptors.request.use(async (config) => {
    let accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Интерсептор ответа для обработки 401 ошибок (токен истек)
apiClient.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const newAccessToken = await refreshAccessToken();
            axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            return apiClient(originalRequest);
        } catch (refreshError) {
            console.error('Unable to refresh access token:', refreshError);
            // Логика выхода из системы или перенаправление на страницу логина
        }
    }
    return Promise.reject(error);
});

export default apiClient;
