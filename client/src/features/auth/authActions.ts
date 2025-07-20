import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../lib/api/authApi';
import { AuthCredentials, AuthResponse } from '@/types/authTypes';

export const loginUser = createAsyncThunk<AuthResponse, AuthCredentials>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await authApi.login(credentials); // returns AuthResponse
            console.log('Login response thunk:', response);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);
