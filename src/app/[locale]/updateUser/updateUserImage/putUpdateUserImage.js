import axios from "axios";
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

const putEditUserImage = async (userImage, toast) => {
    try {

        const accessToken = localStorage.getItem('accessToken')
        const localhost = getLocalhost();

        const formData = new FormData();

        formData.append('ImageFormFile', userImage);

        const response = await axios
            .put(`http://${localhost}/api/Image/edit-user-image/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },
            })

        console.log(response);
        // page reload
        window.location.reload()
        return true
    }
    catch (error) {
        console.log(error);
        if (toast && toast.current) {
            toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
        }
        return false;
    }
}

export default putEditUserImage


