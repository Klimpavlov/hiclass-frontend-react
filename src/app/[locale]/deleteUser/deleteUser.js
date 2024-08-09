import apiClient from "@/app/[locale]/api/utils/axios";

const deleteUser = async (successRedirect, toast) => {

    try {

        const response = apiClient.delete('/User/delete-user/')

        console.log(response);
        toast.current.show({severity: 'info', summary: 'Confirmed', detail: 'User successfully deleted', life: 3000});

        successRedirect()
        return true;
    } catch (error) {
        console.log(error);
        if (toast && toast.current) {
            toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
        }
        return false;
    }
}

export default deleteUser


