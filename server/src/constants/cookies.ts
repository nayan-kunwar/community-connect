export const COOKIE_OPTIONS = {
    httpOnly: true,
    sameSite: (process.env.NODE_ENV === 'production' ? 'none' : 'strict') as 'strict' | 'lax' | 'none',
    secure: process.env.NODE_ENV !== 'development',
};

export const ACCESS_TOKEN_COOKIE = {
    ...COOKIE_OPTIONS,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day from now
};

export const REFRESH_TOKEN_COOKIE = {
    ...COOKIE_OPTIONS,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15), // 15 days from now
};
