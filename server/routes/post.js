import express from 'express';
import { getToken } from '../middleware/getToken.js';
import { validateToken } from '../middleware/validateToken.js';
import Post from '../models/Post.js'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('author');

        res.status(200).json({ success: true, data: { posts } });
    } catch (err) {
        res.status(500).json({ success: false, data: { error: err.message } });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author');

        res.status(200).json({ success: true, data: { post } });
    } catch (err) {
        res.status(500).json({ success: false, data: { error: err.message } });
    }
});


router.post('/new', getToken, validateToken, async (req, res) => {
    try {
        const {title, content} = req.body;

        const post = await Post.create({
            title,
            content,
            author: req.user._id
        });

        await post.save();

        res.status(200).json({success: true, data: {post}})
    } catch (err) {
        res.status(500).json({ success: false, data: { error: err.message } });
    }
})

export default router