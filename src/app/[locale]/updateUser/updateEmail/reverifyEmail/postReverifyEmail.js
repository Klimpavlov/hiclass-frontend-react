import apiClient from "@/app/[locale]/api/utils/axios";

const postReverifyEmail = async (email, toast, errorToasts, updateUserToasts) => {
    try {
        const response = await apiClient.post(`/User/reverify-email`, {
            Email: email,
        })

        console.log(response);
        if (toast && toast.current) {
            toast.current.show({severity: 'info', summary: updateUserToasts("success"), detail: updateUserToasts("emailUpdated"), life: 3000});
        }
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
