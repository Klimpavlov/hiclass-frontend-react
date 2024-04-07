import axios from "axios";


const postLoginData = (email, password, successRedirect, handleLoginError) => {

    axios.post('http://localhost:7280/api/User/login', {
        Email: email,
        Password: password
    })
        .then(function (response) {
            const accessToken = response.data.value.accessToken;
            console.log(response);
            console.log(response.data.value.accessToken)
            localStorage.setItem('accessToken', accessToken);

            successRedirect()
        })
        .catch(function (error) {
            console.log(error);
            handleLoginError();
        });
}

export default postLoginData