// import axios from "axios";
// import getLocalhost from "@/app/[locale]/api/localhost/localhost";
//
// export async function getUserProfile(accessToken) {
//     try {
//         const localhost = getLocalhost();
//         const response = await axios.get(
//             `http://${localhost}/api/User/userprofile`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`
//                 }
//             }
//         );
//         return response.data.value;
//     } catch (error) {
//         console.error(error);
//         return [];
//     }
// }

import apiClient from '../utils/axios';

export const getUserProfile = async () => {
    try {
        const response = await apiClient.get('/user/userprofile');
        return response.data.value;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        // if (error.response && error.response.status === 403) {
        //     window.location.href ='/signUp';
        // }

        throw error;
    }
};