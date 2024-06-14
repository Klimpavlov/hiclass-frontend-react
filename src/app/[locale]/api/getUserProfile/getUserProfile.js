import axios from "axios";
import getLocalhost from "@/app/[locale]/api/localhost/localhost";

export async function getUserProfile(accessToken) {
    try {
        const localhost = getLocalhost();
        const response = await axios.get(
            `http://${localhost}/api/User/userprofile`,
            {
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