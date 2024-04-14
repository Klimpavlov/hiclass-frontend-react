import axios from "axios";

const putBannerImage = (banner) => {

    const accessToken = localStorage.getItem('accessToken')

    const formData = new FormData();

    formData.append('ImageFormFile', banner);

    axios
        .put(`http://localhost:7280/Image/set-user-banner-image/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then(function (response) {
            console.log(response);

            // page reload
            window.location.reload()
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default putBannerImage


