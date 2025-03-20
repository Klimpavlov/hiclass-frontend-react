import apiClient from "@/app/[locale]/api/utils/axios";

const putEditUserImage = async (userImage, toast, successCallback) => {
    try {
        const formData = new FormData();
        formData.append('ImageFormFile', userImage);

        const response = await apiClient
            .put('/Image/edit-user-image/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

        console.log(response);
        // page reload
        // window.location.reload()
        successCallback()
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


