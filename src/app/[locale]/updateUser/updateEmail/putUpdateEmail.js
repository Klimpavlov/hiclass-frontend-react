import axios from "axios";

const putUpdateEmail = async (email, toast) => {
    try {
        const accessToken = localStorage.getItem('accessToken');

        const response = await axios.put('http://localhost:7280/api/EditUser/email', {
            Email: email,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })

        console.log(response);
        return true;
    }
       catch (error) {
            console.log(error);
           if (toast && toast.current) {
               toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
           }
           return false;
        }
};

export default putUpdateEmail;


