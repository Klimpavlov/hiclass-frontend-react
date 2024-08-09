import apiClient from "@/app/[locale]/api/utils/axios";
export async function getAvailableCountries(accessToken) {
    try {
        const response = await apiClient.get('/StaticDataSources/get-available-country-locations');
        return response.data.countryTitles;
    } catch (error) {
        console.error(error);
        throw error
    }
}