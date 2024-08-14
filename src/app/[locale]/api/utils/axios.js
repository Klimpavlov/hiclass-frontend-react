import axios from 'axios';
import {useRouter} from "next/navigation"
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

// Создаем экземпляр axios
const apiClient = axios.create({
    baseURL: `http://${getLocalhost()}/api`,
});

//Функция для получения нового access token с помощью refresh token
const refreshAccessToken = async () => {
    try {
        const refreshToken = sessionStorage.getItem('refreshToken');
        // const refreshToken = getCookie('refreshToken');
        const deviceToken = localStorage.getItem('deviceToken')
        console.log(refreshToken, deviceToken)

        const response = await apiClient.post('/Authentication/refresh-token', {
            refreshToken: refreshToken,
            deviceToken: deviceToken
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        const newAccessToken = response.data.value.accessToken;
        const newRefreshToken = response.data.value.refreshToken;
        sessionStorage.setItem('accessToken', newAccessToken);
        sessionStorage.setItem('refreshToken', newRefreshToken);
        // setCookie('refreshToken', newRefreshToken, 7);
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
            window.location.href = '/signIn';
            // Логика выхода из системы или перенаправление на страницу логина
        }
    }
    return Promise.reject(error);
});

// function getCookie(name) {
//     const nameEQ = name + "=";
//     const ca = document.cookie.split(';');
//     for(let i = 0; i < ca.length; i++) {
//         let c = ca[i];
//         while (c.charAt(0) === ' ') c = c.substring(1, c.length);
//         if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
//     }
//     return null;
// }
//
// function setCookie(name, value, days) {
//     let expires = "";
//     if (days) {
//         const date = new Date();
//         date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//         expires = "; expires=" + date.toUTCString();
//     }
//     document.cookie = name + "=" + (value || "") + expires + "; path=/";
// }

export default apiClient;
