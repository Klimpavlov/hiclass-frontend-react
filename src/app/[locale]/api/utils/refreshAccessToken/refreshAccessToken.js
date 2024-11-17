import Cookies from "js-cookie";
import apiClient from "@/app/[locale]/api/utils/axios";

const refreshAccessToken = async () => {
    try {
        // const refreshToken = sessionStorage.getItem('refreshToken');
        // const deviceToken = localStorage.getItem('deviceToken')
        const refreshToken = Cookies.get('refreshToken');
        const deviceToken = Cookies.get('deviceToken');
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
        // sessionStorage.setItem('accessToken', newAccessToken);
        // sessionStorage.setItem('refreshToken', newRefreshToken);
        Cookies.set('accessToken', newAccessToken);
        Cookies.set('refreshToken', newRefreshToken);
        return newAccessToken;
    } catch (error) {
        console.error('Unable to refresh access token:', error);
        throw error;
    }
};

export default refreshAccessToken;