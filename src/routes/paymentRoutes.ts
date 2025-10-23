import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { createCheckoutSession } from '../controllers/paymentController';

const router = express.Router();

router.post('/create-checkout-session', protect, createCheckoutSession);

export default router;