import apiClient from "@/app/[locale]/api/utils/axios";
const putBannerImage = (banner) => {
    const formData = new FormData();

    formData.append('ImageFormFile', banner);

    apiClient
        .put('/Image/set-user-banner-image/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default putBannerImage


