import axios from "axios";

export async function getAllNotifications(accessToken) {
    try {
        const response = await axios.get('Notifications/all-notifications', {
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
