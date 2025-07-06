import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    PORT: z.string().default('8000'),
    // MONGO_URI: z.string().url(),
    // JWT_SECRET: z.string(),
    // JWT_EXPIRATION: z.string().default('1h'),
});

// console.log('Environment Variables:', envSchema.parse(process.env));

export const config = envSchema.parse(process.env);

