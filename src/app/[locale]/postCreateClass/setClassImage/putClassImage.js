import axios from 'axios';
import getLocalhost from "@/app/[locale]/api/localhost/localhost";
import apiClient from "@/app/[locale]/api/utils/axios";
const putClassImage = async (file, toast) => {
    try {


        const classId = localStorage.getItem('classId');
        const formData = new FormData();
        formData.append('ImageFormFile', file);

        const response = await apiClient.put(`/Image/set-class-image/${classId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
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
