import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
    if (req.user._id !== req.params.userId)
        return next(errorHandler(403, "You do not have permission to update this user"));

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        
        const updateUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                },
            },
            {
                new: true,
            }
        );
        const { password, ...rest } = updateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user._id !== req.params.userId)
        return next(errorHandler(403, "You do not have permission to delete this user"));

    try {
        const deleteUser = await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

export const signout = (req, res, next) => {
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
        });
        res.status(200).json({ message: "User signed out successfully" });
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (req, res, next) => {
    if (!req.user.isAdmin) return next(errorHandler(403, "You do not have permission to get Users"));

    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === "asc" ? 1 : -1;

        const users = await User.find().sort({ createdAt: sortDirection }).skip(startIndex).limit(limit);

        const userWithoutPassword = users.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
        });

        const totalUsers = await User.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

        const lastMonthUsers = await User.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({
            users: userWithoutPassword,
            totalUsers,
            lastMonthUsers,
        });
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return next(errorHandler(404, "User not found"));

        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
