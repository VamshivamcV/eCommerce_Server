import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import { Request, Response } from 'express';
import { AuthRequest } from '../types/express';
export const getUserCart = asyncHandler(async (req:AuthRequest, res:Response)=>{
    const user = await User.findById(req.user?._id);

    if(user){
        res.json(user.cart || []);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

export const saveUserCart = asyncHandler(async(req: AuthRequest, res: Response)=>{
    const { cartItems } = req.body;
    const user = await User.findById(req.user?._id);

    if(user){
        user.cart = cartItems;
        await user.save();
        res.json({ message: 'Cart saved successfully'});
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

export const clearUserCart = asyncHandler(async (req: AuthRequest, res: Response)=> {
    const user = await User.findById(req.user?._id);
    if(user){
        user.cart = [];
        await user.save();
        res.json({ message: 'Cart cleared'});
    } else {
        res.status(404).json({ message: 'User not found'});
    }
});