import axios from 'axios';

const putClassImage =  (file) => {
    const accessToken = localStorage.getItem('accessToken');
    const classId = localStorage.getItem('classId');

    const formData = new FormData();

    formData.append('ImageFormFile', file);

    axios
        .put(`http://localhost:7280/Image/set-class-image/${classId}`, formData, {
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
};

export default putClassImage;