import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export async function validateToken(req, res, next) {
    try {
        const token = req.token;
        jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
            if(err) {
                return res.status(403).json({ success: false, data: { error: err.message } });
            }
            if(!data) {
                return res.status(403).json({success: false, data: {error: "Unauthorized"}});
            }
            const user = await User.findById(data.id);
            if(user && user.email == data.email) {
                user.password = undefined
                req.user = user;
                next()
            } else {
                return res.status(403).json({success: false, data: {error: "Unauthorized"}});
            }
        })
    } catch (err) {
        res.status(500).json({success: false, data: {error: err.message}});
    }
}