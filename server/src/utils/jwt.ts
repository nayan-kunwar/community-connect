
import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../config/config.js';

export const getJwtOptions = (type: 'access' | 'refresh'): SignOptions => ({
    expiresIn:
        (type === 'access'
            ? config.ACCESS_TOKEN_EXPIRY
            : config.REFRESH_TOKEN_EXPIRY) as SignOptions['expiresIn'],
});


export const generateToken = (
    payload: object,
    secret: string,
    type: 'access' | 'refresh'
): string => {
    return jwt.sign(payload, secret, getJwtOptions(type));
};
