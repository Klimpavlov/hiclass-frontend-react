import axios from "axios";
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

const postSignUpData = async (email, password, deviceToken, successRedirect, toast) => {
    try {

        const localhost = getLocalhost();

        await axios.post(`http://${localhost}/api/Authentication/register`, {
            Email: email,
            Password: password,
            DeviceToken: deviceToken
        })
            .then(function (response) {
                const accessToken = response.data.value.accessToken;
                const refreshToken = response.data.value.refreshToken;
                console.log(response);
                console.log(response.data.value.accessToken)
                // localStorage.setItem('accessToken', accessToken);
                sessionStorage.setItem('accessToken', accessToken);
                sessionStorage.setItem('refreshToken', refreshToken);
                // setCookie('refreshToken', refreshToken, 7);
                localStorage.setItem('deviceToken', deviceToken)
                successRedirect()
            })
    }
    catch (error) {
        console.log(error);
        if (toast && toast.current) {
            toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
        }
        return false;
    }
}

export default postSignUpData