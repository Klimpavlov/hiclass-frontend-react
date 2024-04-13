import axios from "axios";
export async function getUserProfile(accessToken) {
    try {
        const response = await axios.get(
            "http://localhost:7280/api/User/userprofile",
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