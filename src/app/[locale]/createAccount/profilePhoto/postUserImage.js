import axios from 'axios';
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

const postUserImage = (file, successRedirect) => {
    const accessToken = localStorage.getItem('accessToken');
    const localhost = getLocalhost();

    const formData = new FormData();

    formData.append('ImageFormFile', file);

    axios
        .put(`http://${localhost}/api/Image/set-user-image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then(function (response) {
            console.log(response);
            successRedirect()
        })
        .catch(function (error) {
            console.log(error);
        });
};

export default postUserImage;