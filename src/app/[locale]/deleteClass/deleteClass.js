import axios from "axios";

const deleteClass = async ({ classId }, toast) => {
    const accessToken = localStorage.getItem('accessToken');

    try {
        const response = await axios.delete(`http://localhost:7280/api/Class/delete-class/${classId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });
        console.log(response);
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Class successfully deleted', life: 3000 });
        window.location.reload();
        return true;
    } catch (error) {
        console.log(error);
        if (toast && toast.current) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
        }
        return false;
    }
}

export default deleteClass;




// import axios from "axios";
//
// const deleteClass = ({classId}, toast) => {
//
//     const accessToken = localStorage.getItem('accessToken')
//
//     axios.delete(`http://localhost:7280/api/Class/delete-class/${classId}`,  {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             }
//         }
//     )
//         .then(function (response) {
//             console.log(response);
//             window.location.reload()
//         })
//         .catch(function (error) {
//             console.log(error);
//
//         });
// }
//
// export default deleteClass
//
//