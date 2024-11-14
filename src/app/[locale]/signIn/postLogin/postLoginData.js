import axios from "axios";
import getLocalhost from "@/app/[locale]/api/localhost/localhost";
import Cookies from "js-cookie";

const postLoginData = async (email, password, deviceToken, successRedirect, toast, errorToastTranslations, userNotVerifiedRedirect) => {
    try {
        const localhost = getLocalhost();

        const response = await axios.post(`http://${localhost}/api/Authentication/login`, {
            Email: email,
            Password: password,
            DeviceToken: deviceToken
        });

        const accessToken = response.data.value.accessToken;
        const refreshToken = response.data.value.refreshToken;

        // Сохраните accessToken в памяти
        // sessionStorage.setItem('accessToken', accessToken);
        // sessionStorage.setItem('refreshToken', refreshToken);
        // localStorage.setItem('deviceToken', deviceToken)

        Cookies.set('accessToken', accessToken);
        Cookies.set('refreshToken', refreshToken);
        Cookies.set('deviceToken', deviceToken);

        successRedirect();
        return true;
    } catch (error) {
        console.log(error);
        console.log(error.response.status);

        if (error.response.data.errors[0].exceptionTitle === "UserNotVerifiedException" && toast && toast.current) {
            toast.current.show({severity: 'error', summary: errorToastTranslations("error"), detail: errorToastTranslations("userNotVerified"), life: 3000});
            userNotVerifiedRedirect();
            return false;
        }

        if (toast && toast.current) {
            toast.current.show({severity: 'error', summary: errorToastTranslations("error"), detail: errorToastTranslations("invalidEmailPassword"), life: 3000});
        }
        return false;
    }
}

// function setCookie(name, value, days) {
//     let expires = "";
//     if (days) {
//         const date = new Date();
//         date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//         expires = "; expires=" + date.toUTCString();
//     }
//     document.cookie = name + "=" + (value || "") + expires + "; path=/";
// }

export default postLoginData;


