import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    PORT: z.string().default('8000'),
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    MONGO_URI: z.string().url(),
    DB_NAME: z.string().default('community_connect'),
});

// console.log('Environment Variables:', envSchema.parse(process.env));

export const config = envSchema.parse(process.env);

