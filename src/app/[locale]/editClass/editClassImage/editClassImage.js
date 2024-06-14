import axios from 'axios';
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

const editClassImage =  (classId, file) => {
    const accessToken = localStorage.getItem('accessToken');
    const localhost = getLocalhost();

    const formData = new FormData();

    formData.append('ImageFormFile', file);

    axios
        .put(`http://${localhost}/api/Image/edit-class-image/${classId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
            },
        })
        // .then(function (response) {
        //     console.log(response);
        //
        //     // page reload
        //     window.location.reload()
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
};

export default editClassImage;