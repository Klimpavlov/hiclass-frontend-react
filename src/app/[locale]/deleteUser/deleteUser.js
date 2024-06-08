import axios from "axios";

const deleteUser = async (successRedirect, toast) => {

    try {


        const accessToken = localStorage.getItem('accessToken')

        const response = axios.delete('http://localhost:7280/api/User/delete-user/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
        )

        console.log(response);
        toast.current.show({severity: 'info', summary: 'Confirmed', detail: 'User successfully deleted', life: 3000});

        successRedirect()
        return true;
    } catch (error) {
        console.log(error);
        if (toast && toast.current) {
            toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
        }
        return false;
    }
}

export default deleteUser


// import axios from "axios";
//
// const deleteUser = (successRedirect) => {
//
//     const accessToken = localStorage.getItem('accessToken')
//
//     axios.delete('http://localhost:7280/api/User/delete-user/',  {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             }
//         }
//     )
//         .then(function (response) {
//             console.log(response);
//             successRedirect()
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }
//
// export default deleteUser


