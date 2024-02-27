import axios from 'axios';

export async function searchRequest(accessToken, searchUrl) {
    try {
        const response = await axios.get(searchUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}