import mongoose, { Schema } from 'mongoose';
import { UserDocument } from "../interfaces/user.interface.js";

const UserSchema: Schema<UserDocument> = new Schema({
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
});

const UserModel = mongoose.models.User as mongoose.Model<UserDocument> || mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;