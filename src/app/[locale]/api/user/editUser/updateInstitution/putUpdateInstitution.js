import apiClient from "@/app/[locale]/api/utils/axios";

const putUpdatePersonalInfo = async (institutionName, institutionAddress, toast) => {

    try {
        // const institutionRequest = institution.split(';')
        // const institutionTitle = institutionRequest[0];
        // const institutionAddress = institution[1];

        const response = await apiClient.put('/EditUser/institution', {
            InstitutionTitle: institutionName,
            Address: institutionAddress,
            Types: [
                "School"
            ]
        });

        console.log(response);
        return true
    } catch (error) {
        console.log(error);
        if (toast && toast.current) {
            toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
        }
        return false;
    }
};

export default putUpdatePersonalInfo;


