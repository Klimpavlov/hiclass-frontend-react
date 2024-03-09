import axios from "axios";
export async function getUserProfile(accessToken) {
    try {
        const response = await axios.get(
            "http://localhost:7280/api/User/get-userprofile",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}