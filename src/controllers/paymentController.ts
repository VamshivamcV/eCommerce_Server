import Stripe from 'stripe';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';
import Order from '../models/orderModel'; // <-- your Mongoose order model
import { AuthRequest } from '../types/express';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const clientUrl = process.env.CLIENT_URL;

// @desc    Create Stripe Checkout Session
// @route   POST /api/checkout
// @access  Private
export const createCheckoutSession = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { orderItems, shippingAddress, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items provided');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not authenticated');
  }

  // ✅ 1. Create order in your DB first
  const newOrder = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    totalPrice,
    isPaid: false,
  });

  // ✅ 2. Create line items for Stripe
  const lineItems = orderItems.map((item: any) => ({
    price_data: {
      currency: 'usd',
      unit_amount: Math.round(item.price * 100),
      product_data: {
        name: item.name || 'Unamed Product',
      },
    },
    quantity: item.qty,
  }));

  // ✅ 3. Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: lineItems,
    success_url: `${clientUrl}/order-success/${newOrder._id}`, // 👈 include the order ID
    cancel_url: `${clientUrl}/place-order`,
    metadata: {
      orderId: newOrder._id.toString(), // ✅ valid order ID from DB
    },
  });

  // ✅ 4. Return the Stripe session URL
  res.json({ url: session.url });
});
