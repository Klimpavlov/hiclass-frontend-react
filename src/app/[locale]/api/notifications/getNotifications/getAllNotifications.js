import apiClient from "@/app/[locale]/api/utils/axios";

export async function getAllNotifications(accessToken) {
    try {
        const response = await apiClient.get('Notifications/all-notifications', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        return response.data.value;
    } catch (error) {
        console.error(error);
        return [];
    }
}
