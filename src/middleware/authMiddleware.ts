import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import { AuthRequest } from '../types/express';

interface DecodedToken {
    id: string;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
        try {
            token = req.headers.authorization?.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (err) {
            res.status(401).json({ message: 'Not authorized, token failed' });    
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};