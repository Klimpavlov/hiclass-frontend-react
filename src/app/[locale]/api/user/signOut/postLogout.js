import apiClient from "@/app/[locale]/api/utils/axios";
import Cookies from "js-cookie";

const postLogout = async (deviceToken, refreshToken, successRedirect) => {
    try {
        const response = await apiClient.post(`/Authentication/log-out`, {
            DeviceToken: deviceToken,
            RefreshToken: refreshToken
        });
        localStorage.clear();
        sessionStorage.clear();
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        console.log(response);
        successRedirect()
        return true;
    } catch (error) {
        console.log(error);
        throw error; // Rethrow the error to be handled in the calling function
    }
}

export default postLogout;
