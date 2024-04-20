import express from "express";
import { createComment, getPostComments, likeComment } from "../controllers/comment.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUser, createComment);
router.get("/getPostComment/:postId", getPostComments);
router.put("/likeComment/:postId", verifyUser, likeComment);

export default router;
