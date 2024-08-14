import apiClient from "@/app/[locale]/api/utils/axios";

const postLogout = async (deviceToken) => {
    try {
        const response = await apiClient.post(`/Authentication/log-out`, {
            DeviceToken: deviceToken
        });

        console.log(response);
        return true;
    } catch (error) {
        console.log(error);
        throw error; // Rethrow the error to be handled in the calling function
    }
}

export default postLogout;
