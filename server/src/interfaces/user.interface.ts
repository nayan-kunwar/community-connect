import { Document } from 'mongoose';

export interface UserDocument extends Document {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;

    // Add methods if needed
    comparePassword(candidatePassword: string): Promise<boolean>;
}