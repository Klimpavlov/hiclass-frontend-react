import apiClient from "@/app/[locale]/api/utils/axios";
import Cookies from "js-cookie";

const postVerificationCode = async (email, code, successRedirect, toast, t) => {

    try {
        // const accessToken = localStorage.getItem('accessToken')
        const accessToken =  Cookies.get('accessToken');
        // const deviceToken = localStorage.getItem('deviceToken')
        const deviceToken = Cookies.get('deviceToken');
        const refreshToken = Cookies.get('refreshToken');


        // const url = `http://${localhost}/api/User/verify-email`;
        // const requestUrl = `${url}?verificationCode=${code}`;

       const response = await apiClient.post('/User/verify-email', {
            DeviceToken: deviceToken || '',
            Email: email,
            VerificationCode: code,
            RefreshToken: refreshToken
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })

        console.log(response);
        successRedirect();
        return true;
    }
    catch (error) {
        console.log(error);
        console.log(error.response.status);
        console.log(error.response.data.errors[0]);
        if (toast && toast.current) {
            toast.current.show({severity: 'error', summary: t("error"), detail: t("errorVerificationCode"), life: 3000});
        }
        return false;
    }



}

export default postVerificationCode



// import axios from "axios";
// import getLocalhost from "@/app/[locale]/api/localhost/localhost";
// import apiClient from "@/app/[locale]/api/utils/axios";
//
// const postVerificationCode = async (email, code) => {
//     const accessToken = localStorage.getItem('accessToken')
//     const localhost = getLocalhost();
//     const deviceToken = localStorage.getItem('deviceToken')
//
//     const url = `http://${localhost}/api/User/verify-email`;
//     const requestUrl = `${url}?verificationCode=${code}`;
//
//     await apiClient.post(`http://${localhost}/api/User/verify-email`, {
//         DeviceToken: deviceToken,
//         Email: email,
//         VerificationCode: code,
//     }, {
//         headers: {
//             Authorization: `Bearer ${accessToken}`,
//         }
//     })
//         .then(function (response) {
//             console.log(response);
//             console.log(response.data.value)
//         })
//         .catch(function (error) {
//             console.log(error);
//             // Перенаправление на страницу с ошибкой при ошибке запроса
//         });
// }
//
// export default postVerificationCode
//
//
//


