import axios from "axios";
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

const putUpdatePassword = async (password, toast) => {
    try {

        const accessToken = localStorage.getItem('accessToken');
        const localhost = getLocalhost();


        const response = await axios.put(`http://${localhost}/api/EditUser/password`, {
            Password: password,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })

        console.log(response);
        toast.current.show({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'New password successfully created',
            life: 3000
        });
        return true;
    } catch (error) {
        if (toast && toast.current) {
            toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
        }
        return false;
    }
};

export default putUpdatePassword;


