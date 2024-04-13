import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { createPost } from "../controllers/createPost.controller.js";

const router = express.Router();

router.post("/create", verifyUser, createPost);

export default router;