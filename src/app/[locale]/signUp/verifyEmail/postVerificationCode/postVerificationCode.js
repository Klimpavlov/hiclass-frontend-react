// import axios from "axios";
// import postSignUpData from "@/app/signUp/postSignUp/postSignUp";
//
// export default async function postVerificationCode(code) {
//     const token = localStorage.getItem('accessToken')
//     const url = 'http://localhost:7280/api/user/confirm-email';
//     const requestUrl = `${url}?verificationCode=${code}`;
//     try {
//         const response = await axios.get(
//             requestUrl, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//         console.log(response);
//         console.log(response.data.value)
//         // const accessToken = response.data.value;
//         // localStorage.setItem('accessToken', accessToken);
//     } catch (error) {
//         console.error(error);
//     }
// }


import axios from "axios";

const postVerificationCode = (email, code) => {
    const accessToken = localStorage.getItem('accessToken')
    const url = 'http://localhost:7280/api/User/verify-email';
    const requestUrl = `${url}?verificationCode=${code}`;

    axios.post("http://localhost:7280/api/User/verify-email", {
        Email: email,
        VerificationCode: code,
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
        .then(function (response) {
            console.log(response);
            console.log(response.data.value)
        })
        .catch(function (error) {
            console.log(error);
            // Перенаправление на страницу с ошибкой при ошибке запроса
        });
}

export default postVerificationCode

