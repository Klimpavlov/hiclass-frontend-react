import axios from "axios";
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

const postLoginData = async (email, password, successRedirect, deviceToken, toast) => {
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
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        // setCookie('refreshToken', refreshToken, 7);
        localStorage.setItem('deviceToken', deviceToken)

        successRedirect();
        return true;
    } catch (error) {
        console.log(error);
        if (toast && toast.current) {
            toast.current.show({severity: 'error', summary: 'Error', detail: "Invalid email or password", life: 3000});
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


