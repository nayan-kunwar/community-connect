import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from './authActions';
import { AuthResponse } from '@/types/authTypes';

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: {
        _id: string | null;
        email: string | null;
    } | null;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: { // Synchronous reducers
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.error = action.payload as string || 'Login failed';
            })
    }
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;