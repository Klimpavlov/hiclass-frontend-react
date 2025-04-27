// import axios from 'axios';
// import Cookies from 'js-cookie';
// import getAppUrl from "@/app/[locale]/api/app/url";
// import refreshAccessToken from "@/app/[locale]/api/utils/refreshAccessToken/refreshAccessToken";
//
//
// //  axios instance
// const apiClient = axios.create({
//     baseURL: getAppUrl() + '/api',
// });
//
// // interceptors
// apiClient.interceptors.request.use(async (config) => {
//     // let accessToken = sessionStorage.getItem('accessToken');
//
//     let accessToken = Cookies.get('accessToken');
//
//     if (accessToken) {
//         config.headers['Authorization'] = `Bearer ${accessToken}`;
//     }
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });
//
// // interceptor for 401 error response (токен истек)
// apiClient.interceptors.response.use((response) => {
//     return response;
// }, async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         try {
//             const newAccessToken = await refreshAccessToken();
//
//             if (!newAccessToken) {
//                 throw new Error("Refresh token expired or invalid");
//             }
//
//             Cookies.set('accessToken', newAccessToken);
//
//             axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
//             originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//             return apiClient(originalRequest);
//         } catch (refreshError) {
//             console.error('Unable to refresh access token:', refreshError);
//             // Cookies.remove('accessToken');
//             // Cookies.remove('refreshToken');
//             window.location.href = '/signIn';
//             return Promise.reject(refreshError);
//         }
//     }
//     return Promise.reject(error);
// });
//
//
// export default apiClient;

import axios from 'axios';
import Cookies from 'js-cookie';
import getAppUrl from "@/app/[locale]/api/app/url";
import refreshAccessToken from "@/app/[locale]/api/utils/refreshAccessToken/refreshAccessToken";

const apiClient = axios.create({
    baseURL: getAppUrl() + '/api',
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

apiClient.interceptors.request.use(config => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
}, error => Promise.reject(error));

apiClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/refresh-token')) {

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return apiClient(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const newAccessToken = await refreshAccessToken();
                Cookies.set('accessToken', newAccessToken);
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                processQueue(null, newAccessToken);
                return apiClient(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
                window.location.href = '/signIn';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
