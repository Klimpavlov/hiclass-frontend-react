import apiClient from "@/app/[locale]/api/utils/axios";

const putSetPassword = async (password, toast, passwordsToasts, errorToasts) => {
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
        // } catch (error) {
        //     if (toast && toast.current) {
        //         toast.current.show({severity: 'error', summary: passwordsToasts("error"), detail: error.message, life: 3000});
        //     }
        //     return false;
        // }
    } catch (error) {
        console.log(error);

        const errorResponse = error.response?.data?.errors?.[0];

        if (toast && toast.current) {
            if (errorResponse?.exceptionTitle === 'UserPasswordAlreadySetException') {
                toast.current.show({
                    severity: 'error',
                    summary: errorToasts("error"),
                    detail: errorToasts("passwordIsSet"),
                    life: 3000
                });
            } else {
                toast.current.show({
                    severity: 'error',
                    summary: passwordsToasts("error"),
                    detail: error.message,
                    life: 3000
                });

            }
        }

        return false;
    }
};

export default putSetPassword;


