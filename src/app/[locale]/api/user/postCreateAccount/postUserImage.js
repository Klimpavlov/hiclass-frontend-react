import axios from 'axios';
import Cookies from "js-cookie";

const postUserImage = (file, successRedirect) => {
    // const accessToken = sessionStorage.getItem('accessToken');
    const accessToken =  Cookies.get('accessToken');

    const formData = new FormData();

    formData.append('ImageFormFile', file);

    axios
        .put("/Image/set-user-image", formData, {
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
