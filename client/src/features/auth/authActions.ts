import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../lib/api/authApi';
import { AuthCredentials, AuthResponse } from '@/types/authTypes';
import { AxiosError } from 'axios';

export const loginUser = createAsyncThunk<AuthResponse, AuthCredentials>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await authApi.login(credentials); // returns AuthResponse
            console.log('Login response thunk:', response);
            return response;
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            return rejectWithValue(
                axiosError.response?.data?.message || 
                axiosError.message || 
                'Login failed'
            );
        }
    }
);
