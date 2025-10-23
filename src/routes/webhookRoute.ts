import express from 'express';
import Stripe from 'stripe';
import { Request, Response } from 'express';
import Order from '../models/orderModel';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

router.post(
    '/',
    express.raw({ type: 'application/json' }),
    async(req: Request, res: Response) => {
        const sig = req.headers['stripe-signature'];

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                sig!,
                process.env.STRIPE_WEBHOOK_SECRET!
            );
        } catch (err: any) {
            console.error(' Webhook signature verification failed.', err);
            return res.status(400).send(`Webhook Error: ${err.message}`)
        }

        console.log('📩 Stripe webhook received:', event.type);

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object as Stripe.Checkout.Session;
            console.log('🔍 Metadata from session:', session.metadata);

            const orderId = session.metadata?.orderId;
            const paymentIntentId = session.payment_intent;

            if (orderId) {
                const order = await Order.findById(orderId);

                if (order) {
                    order.isPaid = true;
                    order.paidAt = new Date();
                    order.paymentResult = {
                        id: paymentIntentId?.toString() || '',
                        status: session.payment_status,
                        update_time: new Date().toISOString(),
                        email_address: session.customer_email || '',
                    };

                    await order.save();
                    console.log('Order marked as paid via webhook.');
                }
            }
        }
        res.status(200).json({ received: true });
    }
);

export default router;