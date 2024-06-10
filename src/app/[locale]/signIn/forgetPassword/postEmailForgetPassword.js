import axios from "axios";

const postEmailForgetPassword = async (email, successRedirect, toast) => {
    try {

        const accessToken = localStorage.getItem('accessToken')

        const response = await axios.post('http://localhost:7280/api/User/forgot-password', {
            Email: email
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
                console.log(response);
        // const newAccessToken = response.data.value.accessToken;
        // localStorage.setItem('accessToken', newAccessToken);
        successRedirect()
        return true;

    } catch (error) {
        console.log(error);
        if (toast && toast.current) {
            toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
        }
        return false;    }
}

export default postEmailForgetPassword