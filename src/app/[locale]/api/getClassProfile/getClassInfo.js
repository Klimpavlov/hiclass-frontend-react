import axios from 'axios';
import apiClient from "@/app/[locale]/api/utils/axios";
export async function getClassInfo(classId) {
    try {

        const response = await apiClient.get(
            `/Class/class-profile/${classId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
       throw error;
    }
}