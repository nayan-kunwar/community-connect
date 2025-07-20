import { RequestHandler } from 'express';
import { User } from '../models/index.js';
import bcrypt from 'bcryptjs';
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from '../constants/cookies.js';

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
    const accessToken = newUser.generateAccessToken();
    const refreshToken = newUser.generateRefreshToken();
    res
      .cookie("access_token", accessToken, ACCESS_TOKEN_COOKIE)
      .cookie("refresh_token", refreshToken, REFRESH_TOKEN_COOKIE)
      .status(201).json({
        success: true,
        message: 'User registered successfully',
        user: userResponse,
      });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const logout: RequestHandler = async (req, res) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $unset: { refreshToken: 1 } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res
      .clearCookie("access_token", ACCESS_TOKEN_COOKIE)
      .clearCookie("refresh_token", REFRESH_TOKEN_COOKIE)
      .status(200)
      .json({ success: true, message: 'Logged out successfully' });
    return;
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    // if (!emailOrUsername || !password) {
    //   res.status(400).json({ message: 'Email/Username and password are required' });
    //   return;
    // }

    const user = await User.findOne({
      $or: [{ email }],
    });

    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    res
      .cookie('access_token', accessToken, ACCESS_TOKEN_COOKIE)
      .cookie('refresh_token', refreshToken, REFRESH_TOKEN_COOKIE)
      .status(200)
      .json({
        success: true,
        message: 'Login successful',
        user: {
          _id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isVerified: user.isVerified,
        },
      });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};