import axios from 'axios';
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

export async function getAvailableDisciplines(accessToken) {
    try {
        const localhost = getLocalhost();
        const response = await axios.get(
            `http://${localhost}/api/StaticDataSources/get-available-disciplines`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return response.data.availableDisciplines;
    } catch (error) {
        console.error(error);
        return [];
    }
}