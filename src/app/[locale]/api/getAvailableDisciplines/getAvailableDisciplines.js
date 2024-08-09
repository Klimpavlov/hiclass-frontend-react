import apiClient from '../utils/axios';

export async function getAvailableDisciplines() {
    try {
        const response = await apiClient.get('/StaticDataSources/get-available-disciplines');
        return response.data.availableDisciplines;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

