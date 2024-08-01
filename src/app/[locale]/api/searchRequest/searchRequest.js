import apiClient from "@/app/[locale]/api/utils/axios";

// export async function searchRequest(accessToken, searchUrl) {
//     try {
//         const response = await axios.get(searchUrl, {
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         return [];
//     }
// }


export async function searchRequest(accessToken, searchUrl) {
    try {
        const response = await apiClient.get(searchUrl);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}