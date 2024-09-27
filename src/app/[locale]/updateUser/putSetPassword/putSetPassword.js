import apiClient from "@/app/[locale]/api/utils/axios";
const putSetPassword = async (password, toast, passwordsToasts) => {
    try {
        const response = await apiClient.put('/EditUser/set-password', {
            NewPassword: password,
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
            toast.current.show({severity: 'error', summary: passwordsToasts("error"), detail: error.message, life: 3000});
        }
        return false;
    }
};

export default putSetPassword;


