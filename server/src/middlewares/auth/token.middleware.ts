import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../../models/index.js";
import { config } from "../../config/config.js";
import { RequestHandler } from 'express';


export const verifyToken: RequestHandler = async (req, res, next) => {
    const token =
        req.cookies?.access_token ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        res.status(401).json({ message: "Access token is required" });
        return;
    }

    try {
        const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
        const user = await User.findById((decoded as JwtPayload)._id).select("-password -refreshToken");

        if (!user) {
            res.status(401).json({ message: "Invalid access token" });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};