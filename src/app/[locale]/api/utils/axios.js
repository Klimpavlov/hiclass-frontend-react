import axios from 'axios';
import Cookies from 'js-cookie';
import getAppUrl from "@/app/[locale]/api/app/url";
import refreshAccessToken from "@/app/[locale]/api/utils/refreshAccessToken/refreshAccessToken";
// import { redirect } from 'next/navigation';


// Экземпляр axios
const apiClient = axios.create({
    baseURL: getAppUrl() + '/api',
});

//Функция для получения нового access token с помощью refresh token
// const refreshAccessToken = async () => {
//     try {
//         // const refreshToken = sessionStorage.getItem('refreshToken');
//         // const deviceToken = localStorage.getItem('deviceToken')
//         const refreshToken = Cookies.get('refreshToken');
//         const deviceToken = Cookies.get('deviceToken');
//         console.log(refreshToken, deviceToken)
//
//         const response = await apiClient.post('/Authentication/refresh-token', {
//             refreshToken: refreshToken,
//             deviceToken: deviceToken
//         }, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         console.log(response);
//         const newAccessToken = response.data.value.accessToken;
//         const newRefreshToken = response.data.value.refreshToken;
//         // sessionStorage.setItem('accessToken', newAccessToken);
//         // sessionStorage.setItem('refreshToken', newRefreshToken);
//         Cookies.set('accessToken', newAccessToken);
//         Cookies.set('refreshToken', newRefreshToken);
//         return newAccessToken;
//     } catch (error) {
//         console.error('Unable to refresh access token:', error);
//         throw error;
//     }
// };

// Интерсептор запроса для добавления access token в заголовки
apiClient.interceptors.request.use(async (config) => {
    // let accessToken = sessionStorage.getItem('accessToken');

    let accessToken = Cookies.get('accessToken');

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
            // redirect('/signIn')
            // Логика выхода из системы или перенаправление на страницу логина
        }
    }
    return Promise.reject(error);
});


export default apiClient;
