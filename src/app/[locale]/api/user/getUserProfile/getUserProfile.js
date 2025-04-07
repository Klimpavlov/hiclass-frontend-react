import apiClient from '../../utils/axios';

export const getUserProfile = async () => {
    try {
        const response = await apiClient.get('/user/userprofile');
        return response.data.value;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        const errorResponse = error.response?.data?.errors?.[0];
        // if (error.response && error.response.status === 403) {
        //     window.location.href ='/createAccount/NameForm';
        // }
        if (errorResponse?.exceptionTitle === "UserNotVerifiedException") {
            window.location.href ='/signUp/verifyEmail/reVerifyEmail';
        }
        if (errorResponse?.exceptionTitle === "UserHasNotAccountException") {
            window.location.href ='/createAccount/NameForm';
        }

        throw error;
    }
};