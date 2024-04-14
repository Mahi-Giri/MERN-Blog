import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { createPost, deletePost, getPost, updatePost } from "../controllers/createPost.controller.js";

const router = express.Router();

router.post("/create", verifyUser, createPost);
router.get("/getPosts", getPost);
router.delete("/deletePost/:postId/:userId", verifyUser, deletePost);
router.put("/updatePost/:postId/:userId", verifyUser, updatePost);

export default router;
