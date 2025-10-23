import { Request, Response } from "express";
import User from '../models/userModel';
import { AuthRequest } from "../types/express";

export const getUserProfile = async (req: AuthRequest, res: Response) => {
    const user = await User.findById(req.user?.id).select('-password');

    if(user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

export const updateUserProfile = async (req: AuthRequest, res: Response) => {
    const user = await User.findById(req.user?.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        user.shippingAddress = req.body.shippingAddress || user.shippingAddress;

        const updatedUser = await user.save();

        res.json({
            _id : updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            shippingAddress: updatedUser.shippingAddress,
            token: updatedUser.generateJWT(),
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};