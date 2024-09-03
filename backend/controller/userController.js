import { User } from '../models/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Corrected import statement

export const register = async (req, res) => {
    const { name, email, phone, password } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill the full form",
        });
    }

    try {
        // Check if user already exists by email
        const isUser = await User.findOne({ email });
        if (isUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists!",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const user = await User.create({ name, email, phone, password: hashedPassword });

        // Respond with success message
        res.status(201).json({
            success: true,
            message: "User registered successfully!",
            user,
        });

    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill the full form",
        });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Compare the password with the hashed password
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES,
        });

        // Set cookie with token
        res.status(200).cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        }).json({
            success: true,
            message: "User logged in",
            user,
            token,
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};

export const getUser = async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if(!user) {
        return next(
            res.status(404).json({
                success: false,
                message: "User not found",
            })
        )
    }
    res.status(200).json({
        success: true,
       user,
    })
}
export const logout = async (req, res) => {
    res.status(200).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()), // Set the cookie to expire immediately
    }).json({
        success: true,
        message: "User logged out",
    });
};