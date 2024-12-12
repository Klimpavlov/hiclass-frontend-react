import apiClient from "@/app/[locale]/api/utils/axios";

const postEmailForgetPassword = async (email, successRedirect, errorToastsTranslations, toast) => {
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
        console.log(error.response.status);
        console.log(error.response.data.errors[0]);
        if (toast && toast.current) {
            toast.current.show({
                severity: 'error',
                summary: errorToastsTranslations("error"),
                detail: errorToastsTranslations("userNotFound"),
                life: 3000
            });
        }
        return false;
    }
}

export default postEmailForgetPassword