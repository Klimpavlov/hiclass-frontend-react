import apiClient from "@/app/[locale]/api/utils/axios";

const putUpdateEmail = async (email, toast) => {
    try {
        const response = await apiClient.put('/EditUser/email', {
            Email: email,
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


