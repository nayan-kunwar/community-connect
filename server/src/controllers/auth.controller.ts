import { RequestHandler } from 'express';
import { User } from '../models/index.js';
import bcrypt from 'bcryptjs';

export const signup: RequestHandler = async (req, res) => {
    try {
        const { username, firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            res.status(409).json({ message: 'Email or username already in use' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const userResponse = {
            id: newUser._id,
            username: newUser.username,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            isVerified: newUser.isVerified,
        };

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: userResponse,
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
