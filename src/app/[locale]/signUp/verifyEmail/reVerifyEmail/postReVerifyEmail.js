import apiClient from "@/app/[locale]/api/utils/axios";

const postReVerifyEmail = async (email, successRedirect, toast, t) => {
    try {
        const response = await apiClient.post(`/User/reverify-email`, {
            Email: email,
        })

        console.log(response);
        successRedirect();
        return true;
    }
    catch (error) {
        console.log(error);
        console.log(error.response.status);
        console.log(error.response.data.errors[0]);
        if (toast && toast.current) {
            toast.current.show({severity: 'error', summary: t("error"), detail: t("errorEmail"), life: 3000});
        }
        return false;
    }
};
export default postReVerifyEmail
