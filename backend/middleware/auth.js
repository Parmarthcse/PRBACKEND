import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);

        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token or authentication failed",
        });
    }
};
