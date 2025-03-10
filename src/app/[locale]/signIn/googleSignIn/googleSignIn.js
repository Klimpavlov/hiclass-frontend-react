import Cookies from "js-cookie";
import apiClient from "@/app/[locale]/api/utils/axios";

const postGoogleLoginData = async (token, deviceToken) => {
    try {
        const response = await apiClient.post('/Authentication/google-signin', {
            Token: token,
            DeviceToken: deviceToken
        });

        console.log(response)
        const accessToken = response.data.value.accessToken;
        const refreshToken = response.data.value.refreshToken;

        // Сохраните accessToken в памяти
        // sessionStorage.setItem('accessToken', accessToken);
        // sessionStorage.setItem('refreshToken', refreshToken);
        // localStorage.setItem('deviceToken', deviceToken)

        Cookies.set('accessToken', accessToken);
        Cookies.set('refreshToken', refreshToken);
        Cookies.set('deviceToken', deviceToken);


        return true;
    } catch (error) {
        console.error('Error during Google login request:', error);
        console.log(error.response.status);
        console.log(error.response.data.errors[0]);
        return false;
    }
}
export default postGoogleLoginData;




