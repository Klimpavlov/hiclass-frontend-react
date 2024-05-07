import axios from "axios";

const deleteUser = (successRedirect) => {

    const accessToken = localStorage.getItem('accessToken')

    axios.delete('http://localhost:7280/api/User/delete-user/',  {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }
    )
        .then(function (response) {
            console.log(response);
            successRedirect()
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default deleteUser


