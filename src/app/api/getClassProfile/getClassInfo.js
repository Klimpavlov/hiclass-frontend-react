import axios from 'axios';

export async function getClassInfo(accessToken, classId) {
    try {
        const response = await axios.get(
            `http://localhost:7280/api/Class/class-profile/${classId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}