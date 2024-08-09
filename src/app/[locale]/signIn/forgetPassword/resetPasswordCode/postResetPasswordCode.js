import apiClient from "@/app/[locale]/api/utils/axios";

const postResetPasswordCode = async (email, code, toast) => {
    try {
        const response = await apiClient.post('/Authentication/check-reset-password-code', {
            Email: email,
            ResetCode: code,
        })

        console.log(response);
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

