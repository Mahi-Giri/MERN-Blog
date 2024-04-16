import { Schema, model } from "mongoose";

const commentSchema = new Schema(
    {
        content: {
            type: "string",
            required: true,
        },

        postId: {
            type: "string",
            required: true,
        },

        userId: {
            type: "string",
            required: true,
        },

        likes: {
            type: Array,
            default: [],
        },

        numberOfLikes: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export const Comment = model("Comment", commentSchema);
