import axios from "axios";

const postResetPasswordCode = (code, successRedirect) => {
    const accessToken = localStorage.getItem('accessToken')

    axios.post("http://localhost:7280/api/User/check-reset-password-code", {
        ResetCode: code,
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
        .then(function (response) {
            console.log(response);
            successRedirect()
        })
        .catch(function (error) {
            console.log(error);
            // Перенаправление на страницу с ошибкой при ошибке запроса
        });
}

export default postResetPasswordCode

