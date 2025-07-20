// User data type
export interface UserData {
    _id: string;
    email: string;
    name: string;
    roles?: string[]; // Optional roles for authorization
}

// Type for login/signup credentials
export interface AuthCredentials {
    email: string;
    password: string;
}


// Response type for successful login
export interface AuthResponse {
    success: boolean;
    message: string;
    user: UserData;
}

// Error response type
export interface AuthError {
    message: string;
    code?: number;
    errors?: Record<string, string>; // Field-specific errors
}

// Type for the auth state in Redux
export interface AuthState {
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    user: UserData | null;
}