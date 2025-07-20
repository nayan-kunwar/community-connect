import mongoose, { Schema } from 'mongoose';
import { UserDocument } from "../interfaces/user.interface.js";
import bcrypt from 'bcryptjs';
import { config } from '../config/config.js';
import { generateToken } from '../utils/jwt.js';
import { email } from 'zod/v4';

const UserSchema: Schema<UserDocument> = new Schema({
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
});


// Pre-save hook to hash password before saving it to DB
UserSchema.pre<UserDocument>("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

// Method to compare password
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate Access token
UserSchema.methods.generateAccessToken = function (): string {
    return generateToken(
        { _id: this._id, username: this.username, email: this.email },
        config.ACCESS_TOKEN_SECRET,
        'access'
    );
};

// Method to generate Refresh token
UserSchema.methods.generateRefreshToken = function (): string {
    return generateToken(
        { id: this._id, username: this.username, email: this.email },
        config.REFRESH_TOKEN_SECRET,
        'refresh'
    );
};


const UserModel = mongoose.models.User as mongoose.Model<UserDocument> || mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;