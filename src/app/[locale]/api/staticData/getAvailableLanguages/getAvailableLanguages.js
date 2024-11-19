import apiClient from "@/app/[locale]/api/utils/axios";
export async function getAvailableLanguages() {
    try {
        const response = await apiClient.get('/StaticDataSources/get-available-languages');
        return response.data.availableLanguages;
    } catch (error) {
        console.error(error);
        throw error;
    }
}