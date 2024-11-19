import apiClient from '../../utils/axios';

export async function getDefaultSearch() {
    try {
        const response = await apiClient.get('/Search/default-search-request');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


