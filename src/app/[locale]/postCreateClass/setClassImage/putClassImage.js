import axios from 'axios';
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

const putClassImage = async (file, toast) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const localhost = getLocalhost();

        const classId = localStorage.getItem('classId');
        const formData = new FormData();
        formData.append('ImageFormFile', file);

        const response = await axios.put(`http://${localhost}/api/Image/set-class-image/${classId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log(response);
        return true;
    } catch (error) {
        console.log(error);
        if (toast && toast.current) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        }
        return false;
    }
};

export default putClassImage;
