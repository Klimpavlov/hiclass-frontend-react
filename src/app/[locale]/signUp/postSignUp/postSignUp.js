import axios from "axios";
import Cookies from "js-cookie";

const postSignUpData = async (email, password, deviceToken, successRedirect, toast, errorToastTranslations) => {
    try {
        await axios.post('/Authentication/register', {
            Email: email,
            Password: password,
            DeviceToken: deviceToken
        })
            .then(function (response) {
                const accessToken = response.data.value.accessToken;
                const refreshToken = response.data.value.refreshToken;
                console.log(response);
                console.log(response.data.value.accessToken)

                // sessionStorage.setItem('accessToken', accessToken);
                // sessionStorage.setItem('refreshToken', refreshToken);
                // localStorage.setItem('deviceToken', deviceToken)

                Cookies.set('accessToken', accessToken);
                Cookies.set('refreshToken', refreshToken);
                Cookies.set('deviceToken', deviceToken);

                successRedirect()
            })
    }
    catch (error) {
        console.log(error);
        console.log(error.response.status);
        console.log(error.response.data.errors[0]);
        const errorResponse = error.response?.data?.errors?.[0];

        if (toast && toast.current) {
            if (errorResponse?.exceptionTitle === 'UserAlreadyExistsException') {
                toast.current.show({
                    severity: 'error',
                    summary: errorToastTranslations("error"),
                    detail: errorToastTranslations("userExists"),
                    life: 3000
                });
            } else {
                toast.current.show({
                    severity: 'error',
                    summary: errorToastTranslations("error"),
                    detail: error.message || 'An unknown error occurred.',
                    life: 3000
                });
            }
        }

        return false;
    }
}

export default postSignUpData
