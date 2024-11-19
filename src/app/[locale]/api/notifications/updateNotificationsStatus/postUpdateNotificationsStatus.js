import apiClient from "@/app/[locale]/api/utils/axios";

const postUpdateNotificationStatus = async (notificationId, status, toast) => {
    try {
        const response = await apiClient.post('/Notifications/update-notification-status', {
            NotificationId: notificationId,
            Status: status,
        });

        console.log(response);
        return true;
    } catch (error) {
        console.log(error);
        if (toast && toast.current) {
            toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
        }
        return false;
    }
};

export default postUpdateNotificationStatus;
