import axios from 'axios';
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

export async function getDefaultSearch(accessToken) {
    try {
        const localhost = getLocalhost();
        const response = await axios.get(
            `http://${localhost}/api/Search/default-search-request`,
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