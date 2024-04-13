import { Post } from "../models/post,model.js";
import { errorHandler } from "../utils/error.js";

export const createPost = async (req, res, next) => {
    if (!req.user.isAdmin) return next(errorHandler(403, "You do not have permission to add the post"));

    if (!req.body.title || !req.body.content) return next(errorHandler(400, "Please provide all required content"));

    const slug = req.body.title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, "-");

    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user._id,
    });

    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
};
