import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'
import express from 'express'
import { getToken } from '../middleware/getToken.js';
import { validateToken } from '../middleware/validateToken.js';

// Register user
const router = express.Router();

router.post('/validate', getToken, validateToken, async (req, res) => {
    try {
        const user = req.user;
        user.password = undefined;

        res.status(200).json({ success: true, data: { user } });
    } catch (error) {
        res.status(500).json({ success: false, data: { error } });
    }
})


router.post('/register', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: passwordHash,
        });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

        const savedUser = await user.save();
        delete savedUser.password;

        res.status(201).json({ success: true, data: { accessToken: token } });
    } catch (err) {
        res.status(500).json({ success: false, data: { error: err.message } });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(403).json({ success: false, data: { error: "User with given email doesn't exist. " } });
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(403).json({ success: false, data: { error: "Wrong password. " } });
        }

        user.password = undefined;
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
        return res.status(201).json({ success: true, data: { accessToken: token, user } });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, data: { error: err.message } });
    }
});


export default router;