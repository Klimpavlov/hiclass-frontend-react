import axios from "axios";
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

const postResetPassword = async (password, toast) => {
    try {
        const accessToken = localStorage.getItem('accessToken')
        const localhost = getLocalhost();

        const response = await axios.post(`http://${localhost}/api/User/reset-password`, {
            Password: password,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })

        console.log(response);
        return true;
    }
        catch (error) {
            console.log(error);
            if (toast && toast.current) {
                toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
            }
            return false;        }
}

export default postResetPassword

