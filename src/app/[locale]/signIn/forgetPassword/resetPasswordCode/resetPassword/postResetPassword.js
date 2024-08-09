import apiClient from "@/app/[locale]/api/utils/axios";

const postResetPassword = async (password, toast) => {
    const deviceToken = localStorage.getItem('deviceToken');

    try {
        const response = await apiClient.post('/Authentication/reset-password', {
            DeviceToken: deviceToken,
            NewPassword: password,
        })

        console.log(response);
        return true;
    }
        catch (error) {
            console.log(error);
            if (toast && toast.current) {
                toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
            }
            return false;        }
}

export default postResetPassword

