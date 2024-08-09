import apiClient from "@/app/[locale]/api/utils/axios";
const postEmailForgetPassword = async (email, successRedirect, toast) => {
    try {
       const response = await apiClient.post('/Authentication/forgot-password', {
            Email: email
        })
                console.log(response);
        // const newAccessToken = response.data.value.passwordResetToken;
        // localStorage.setItem('accessToken', newAccessToken);
        successRedirect()
        return true;

    } catch (error) {
        console.log(error);
        if (toast && toast.current) {
            toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
        }
        return false;    }
}

export default postEmailForgetPassword