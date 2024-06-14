import axios from "axios";
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

const postResetPasswordCode = async (code, toast) => {
    try {
        const accessToken = localStorage.getItem('accessToken')
        const localhost = getLocalhost();


        const response = await axios.post(`http://${localhost}/api/User/check-reset-password-code`, {
            ResetCode: code,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })

        console.log(response);
        // successRedirect()
        return true;
    }
        catch (error) {
            console.log(error);
            if (toast && toast.current) {
                toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
            }
            return false;
        }
}

export default postResetPasswordCode

