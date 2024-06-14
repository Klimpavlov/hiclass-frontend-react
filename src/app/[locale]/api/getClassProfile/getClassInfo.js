import axios from 'axios';
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

export async function getClassInfo(accessToken, classId) {
    try {
        const localhost = getLocalhost();
        const response = await axios.get(
            `http://${localhost}/api/Class/class-profile/${classId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}