import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    content: {
        type: String,
        required: true,
        min: 2,
        max: 500
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {timestamps: true})

const post = mongoose.model("Post", postSchema);

export default post;