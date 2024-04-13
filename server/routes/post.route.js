import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { createPost, getPost } from "../controllers/createPost.controller.js";

const router = express.Router();

router.post("/create", verifyUser, createPost);
router.get("/getPosts", getPost);

export default router;
