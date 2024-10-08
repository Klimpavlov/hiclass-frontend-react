import axios from 'axios';
import getLocalhost from "@/app/[locale]/api/localhost/localhost";
import Cookies from "js-cookie";

const postUserImage = (file, successRedirect) => {
    // const accessToken = sessionStorage.getItem('accessToken');
    const accessToken =  Cookies.get('accessToken');
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