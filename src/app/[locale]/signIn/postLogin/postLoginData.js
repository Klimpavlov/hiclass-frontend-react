// import axios from "axios";
// import getLocalhost from "@/app/[locale]/api/localhost/localhost";
//
// const postLoginData = async (email, password, successRedirect, deviceToken, toast) => {
//     try {
//
//         const localhost = getLocalhost();
//
//         await axios.post(`http://${localhost}/api/Authentication/login`, {
//             Email: email,
//             Password: password,
//             DeviceToken: deviceToken
//         })
//             .then(function (response) {
//                 const accessToken = response.data.value.accessToken;
//                 console.log(response);
//                 console.log(response.data.value.accessToken)
//                 localStorage.setItem('accessToken', accessToken);
//                 successRedirect()
//                 return true;
//             })
//     }
//     catch (error) {
//         console.log(error);
//         if (toast && toast.current) {
//             toast.current.show({severity: 'error', summary: 'Error', detail: "Invalid email or password", life: 3000});
//         }
//         return false;
//     }
// }
//
// export default postLoginData

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

export default postLoginData;
