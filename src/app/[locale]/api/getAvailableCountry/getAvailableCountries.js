import axios from 'axios';
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

export async function getAvailableCountries(accessToken) {
    try {
        const localhost = getLocalhost();
        const response = await axios.get(
            `http://${localhost}/api/StaticDataSources/get-available-country-locations`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data.countryTitles;
    } catch (error) {
        console.error(error);
        return [];
    }
}