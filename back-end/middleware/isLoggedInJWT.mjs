
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.PRIVATE_JWT_KEY;


export function isLoggedInJWT(User) {
    return async (req, res, next) => {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.userId = decoded.userId;
            req.user = await User.findByPk(req.userId); 
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
    }
}