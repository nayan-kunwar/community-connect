import { Document, Types } from 'mongoose';

export interface UserDocument extends Document {
    _id: Types.ObjectId
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}