import axios from "axios";
import postSignUpData from "@/app/signUp/postSignUp/postSignUp";

export default async function getVerifyCode(code) {
    const token = localStorage.getItem('accessToken')
    const url = 'http://localhost:7280/api/user/confirm-email';
    const requestUrl = `${url}?verificationCode=${code}`;
    try {
        const response = await axios.get(
            requestUrl, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

