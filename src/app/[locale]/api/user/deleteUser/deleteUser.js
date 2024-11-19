import apiClient from "@/app/[locale]/api/utils/axios";

const deleteUser = async (successRedirect, toast, deleteUserToastTranslations) => {

    try {

        const response = apiClient.delete('/User/delete-user/')

        console.log(response);
        toast.current.show({severity: 'info', summary: deleteUserToastTranslations("confirmed"), detail: deleteUserToastTranslations("successMessage"), life: 3000});

        successRedirect()
        return true;
    } catch (error) {
        console.log(error);
        if (toast && toast.current) {
            toast.current.show({severity: 'error', summary: deleteUserToastTranslations("error"), detail: error.message, life: 3000});
        }
        return false;
    }
}

export default deleteUser


