import axios from 'axios';
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

export async function getAvailableLanguages(accessToken) {
    try {
        const localhost = getLocalhost();
        const response = await axios.get(
            `http://${localhost}/api/StaticDataSources/get-available-languages`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data.availableLanguages;
    } catch (error) {
        console.error(error);
        return [];
    }
}