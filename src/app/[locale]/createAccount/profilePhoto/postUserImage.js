import axios from 'axios';

const postUserImage = (file) => {
    const accessToken = localStorage.getItem('accessToken');

    const formData = new FormData();

    formData.append('ImageFormFile', file);

    axios
        .put('http://localhost:7280/api/Image/set-user-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

export default postUserImage;