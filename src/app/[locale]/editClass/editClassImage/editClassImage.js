import apiClient from "@/app/[locale]/api/utils/axios";

const editClassImage = async (classId, file, toast) => {
    try {
        const formData = new FormData();

        formData.append('ImageFormFile', file);

        const response = apiClient.put(`/Image/edit-class-image/${classId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        console.log(response)
        return true;
    }
    catch (error) {
        console.log(error);
        if (toast && toast.current) {
            toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
        }
        return false;
    }
};

export default editClassImage;