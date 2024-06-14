import axios from "axios";
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

const putBannerImage = (banner) => {
    const accessToken = localStorage.getItem('accessToken')
    const localhost = getLocalhost();

    const formData = new FormData();

    formData.append('ImageFormFile', banner);

    axios
        .put(`http://${localhost}/api/Image/set-user-banner-image/`, formData, {
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


