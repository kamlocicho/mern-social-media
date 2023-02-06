export function getToken(req, res, next) {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        res.status(403).json({ success: false, data: { error: "You are not logged in. " } });
    }
}