import { Router } from "express";
import { deleteUser, getUser, getUsers, signout, updateUser } from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = Router();

router.put("/update/:userId", verifyUser, updateUser);
router.delete("/delete/:userId", verifyUser, deleteUser);
router.post("/signout", signout);
router.get("/getUsers", verifyUser, getUsers);
router.get("/:userId", getUser)

export default router;
