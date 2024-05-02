import axios from 'axios';

const editClassImage =  (classId, file) => {
    const accessToken = localStorage.getItem('accessToken');

    const formData = new FormData();

    formData.append('ImageFormFile', file);

    axios
        .put(`http://localhost:7280/Image/edit-class-image/${classId}`, formData, {
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

export default editClassImage;