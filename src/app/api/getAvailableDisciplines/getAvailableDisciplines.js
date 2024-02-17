import axios from 'axios';

export async function getAvailableDisciplines(accessToken) {
    try {
        const response = await axios.get(
            'http://localhost:7280/api/StaticDataSources/get-available-disciplines',
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