import apiClient from "@/app/[locale]/api/utils/axios";

const postReverifyEmail = async (email, toast, errorToasts) => {
    try {
        const response = await apiClient.post(`/User/reverify-email`, {
            Email: email,
        })

        console.log(response);
        return true;
    }
    catch (error) {
        console.log(error);
        if (toast && toast.current) {
            toast.current.show({severity: 'error', summary: errorToasts("error"), detail: error.message, life: 3000});
        }
        return false;
    }
};
export default postReverifyEmail
