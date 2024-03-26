import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || username === "") return res.status(400).json({ message: "Please enter a username" });
    if (!email || email === "") return res.status(400).json({ message: "Please enter an email" });
    if (!password || password === "") return res.status(400).json({ message: "Please enter a password" });

    const hashPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashPassword,
    });

    try {
        await newUser.save();
        return res.status(200).json({ message: "User saved successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
