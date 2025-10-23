import { Request, Response } from "express";
import Order from "../models/orderModel";
import { AuthRequest } from "../types/express";
import asyncHandler from "express-async-handler";

export const addOrder = async (req: AuthRequest, res: Response) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  const order = new Order({
    user: req.user?._id,
    orderItems,
    shippingAddress,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

export const getMyOrders = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const orders = await Order.find({ user: req.user?._id }).populate({
      path: "orderItems.product",
      select: "title image price",
    })
    .sort({createdAt: -1});
    res.json(orders);
  }
);
