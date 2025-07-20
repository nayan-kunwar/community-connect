import axios, { AxiosError } from 'axios';
import { AuthCredentials, AuthResponse } from '../../types/authTypes';


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authApi = {
    async login(credentials: AuthCredentials): Promise<AuthResponse> {
        console.log('Attempting login with:', credentials);
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials, {
                withCredentials: true,
            });
            console.log('Login response:', response.data);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            console.error(
                'Login API Error:',
                axiosError.response?.data?.message ||
                axiosError.message
            );
            throw axiosError;
        }
    },

    async logout(): Promise<void> {
        await axios.post(`${API_BASE_URL}/auth/logout`);
    },
}