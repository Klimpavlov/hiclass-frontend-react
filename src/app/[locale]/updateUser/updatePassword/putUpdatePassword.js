import apiClient from "@/app/[locale]/api/utils/axios";
const putUpdatePassword = async (oldPassword, newPassword, toast) => {
    try {
        const response = await apiClient.put('/EditUser/password', {
            OldPassword: oldPassword,
            Password: newPassword,
        })

        console.log(response);
        toast.current.show({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'New password successfully created',
            life: 3000
        });
        return true;
    } catch (error) {
        if (toast && toast.current) {
            toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
        }
        return false;
    }
};

export default putUpdatePassword;


