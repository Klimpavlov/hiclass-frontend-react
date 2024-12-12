import axios from "axios";
import getLocalhost from "@/app/[locale]/api/localhost/localhost";
import Cookies from "js-cookie";

const postGoogleLoginData = async (token, deviceToken) => {
    try {
        const localhost = getLocalhost();

        const response = await axios.post(`http://${localhost}/api/Authentication/google-signin`, {
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




