import axios from "axios";
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

const putUpdatePersonalInfo = async (institution, toast) => {

    try {
        const accessToken = localStorage.getItem('accessToken');
        const localhost = getLocalhost();

        const institutionRequest = institution.split(';')
        const institutionTitle = institutionRequest[0];
        const institutionAddress = institution[1]

        const response = await axios.put(`http://${localhost}/api/EditUser/institution`, {
            InstitutionTitle: institutionTitle,
            Address: institutionAddress,
            Types: [
                "School"
            ]
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })

        console.log(response);
        return true
    } catch (error) {
        console.log(error);
        if (toast && toast.current) {
            toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
        }
        return false;
    }
};

export default putUpdatePersonalInfo;


