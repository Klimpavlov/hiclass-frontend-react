import axios from 'axios';

export async function getAvailableCountries(accessToken) {
    try {
        const response = await axios.get(
            'http://localhost:7280/api/StaticDataSources/get-available-country-locations',
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