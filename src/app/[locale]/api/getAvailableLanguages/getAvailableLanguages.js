import axios from 'axios';

export async function getAvailableLanguages(accessToken) {
    try {
        const response = await axios.get(
            'http://localhost:7280/api/StaticDataSources/get-available-languages',
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