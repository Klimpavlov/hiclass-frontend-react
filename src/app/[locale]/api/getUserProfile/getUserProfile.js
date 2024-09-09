import apiClient from '../utils/axios';

export const getUserProfile = async () => {
    try {
        const response = await apiClient.get('/user/userprofile');
        return response.data.value;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        if (error.response && error.response.status === 403) {
            window.location.href ='/createAccount/NameForm';
        }

        throw error;
    }
};