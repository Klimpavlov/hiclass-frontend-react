import apiClient from "@/app/[locale]/api/utils/axios";
import Cookies from "js-cookie";

const postResetPasswordCode = async (email, code, toast) => {
    try {
        const response = await apiClient.post('/Authentication/check-reset-password-code', {
            Email: email,
            ResetCode: code,
        })

        console.log(response);
        const accessToken = response.data.value.accessToken;
        const refreshToken = response.data.value.refreshToken;
        // sessionStorage.setItem('accessToken', accessToken);
        // sessionStorage.setItem('refreshToken', refreshToken);

        Cookies.set('accessToken', accessToken);
        Cookies.set('refreshToken', refreshToken);

        // successRedirect()
        return true;
    }
        catch (error) {
            console.log(error);
            if (toast && toast.current) {
                toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
            }
            return false;
        }
}

export default postResetPasswordCode

