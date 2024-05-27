import axios from "axios";

const deleteClass = ({classId}) => {

    const accessToken = localStorage.getItem('accessToken')

    axios.delete(`http://localhost:7280/api/Class/delete-class/${classId}`,  {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }
    )
        .then(function (response) {
            console.log(response);
            window.location.reload()
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default deleteClass


