import axios from "axios";
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

const postLoginData = async (email, password, successRedirect, deviceToken, toast) => {
    try {

        const localhost = getLocalhost();

        await axios.post(`http://${localhost}/api/User/login`, {
            Email: email,
            Password: password,
            DeviceToken: deviceToken
        })
            .then(function (response) {
                const accessToken = response.data.value.accessToken;
                console.log(response);
                console.log(response.data.value.accessToken)
                localStorage.setItem('accessToken', accessToken);
                successRedirect()
                return true;
            })
    }
    catch (error) {
        console.log(error);
        if (toast && toast.current) {
            toast.current.show({severity: 'error', summary: 'Error', detail: "Invalid email or password", life: 3000});
        }
        return false;
    }
}

export default postLoginData