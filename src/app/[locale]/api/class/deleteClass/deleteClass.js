import axios from "axios";
import apiClient from "@/app/[locale]/api/utils/axios";
import {useTranslations} from "next-intl";

const deleteClass = async ({ classId }, toast, deleteClassTranslation) => {
    try {
        const response = await apiClient.delete(`/Class/delete-class/${classId}`, {

        });
        console.log(response);
        toast.current.show({ severity: 'info', summary: deleteClassTranslation("confirmed"), detail: deleteClassTranslation("successMessage"), life: 3000 });
        // window.location.reload();
        return true;
    } catch (error) {
        console.log(error);
        if (toast && toast.current) {
            toast.current.show({ severity: 'error', summary: deleteClassTranslation("error"), detail: error.message, life: 3000 });
        }
        return false;
    }
}

export default deleteClass;
