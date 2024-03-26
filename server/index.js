import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "./constant.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();

mongoose.connect(`${process.env.MONGO_CONNECTION_STRING}/${DB_NAME}`).then(() => {
    console.log("Connected to the database...");
});

const app = express();

app.use(express.json());

app.listen(8000, () => {
    console.log("Server is running on port 8000...");
});

app.use("/api/v1/user", userRoute);

// Secured routes
app.use("/api/v1/auth", authRoute);