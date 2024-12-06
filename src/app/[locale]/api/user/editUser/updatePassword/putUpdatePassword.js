import apiClient from "@/app/[locale]/api/utils/axios";
const putUpdatePassword = async (oldPassword, newPassword, toast, passwordsToasts) => {
    try {
        const response = await apiClient.put('/EditUser/password', {
            OldPassword: oldPassword,
            NewPassword: newPassword,
        })

        console.log(response);
        toast.current.show({
            severity: 'info',
            summary: passwordsToasts("confirmed"),
            detail: passwordsToasts("newPasswordConfirmedMessage"),
            life: 3000
        });
        return true;
    } catch (error) {
        if (toast && toast.current) {
            toast.current.show({severity: 'error', summary: passwordsToasts("error"), detail: passwordsToasts("wrongPassword"), life: 3000});
        }
        return false;
    }
};

export default putUpdatePassword;


