import axios from "axios";
import getLocalhost from "@/app/[locale]/api/localhost/localhost";
const postUpdateNotificationStatus = async (toast) => {

    try {
        const accessToken = localStorage.getItem('accessToken');
        const localhost = getLocalhost();

        const response = await axios.post(`http://${localhost}/api/Notifications/update-notification-status`, {
            NotificationId: "d3186d0a-afd8-478f-95bf-022695ae6da1",
            Status: "Read",
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        console.log(response);
        return true;
    }
    catch (error) {
        console.log(error);
        if (toast && toast.current) {
            toast.current.show({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
        }
        return false;
    }
};

export default postUpdateNotificationStatus;