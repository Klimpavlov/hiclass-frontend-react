import axios from 'axios';

export async function getDefaultSearch(accessToken) {
    try {
        const response = await axios.get(
            'http://localhost:7280/api/Search/default-search-request',
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