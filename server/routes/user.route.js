import { Router } from "express";
import { deleteUser, getUsers, signout, updateUser } from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = Router();

router.put("/update/:userId", verifyUser, updateUser);
router.delete("/delete/:userId", verifyUser, deleteUser);
router.post("/signout", signout);
router.get("/getUsers", verifyUser, getUsers);

export default router;
