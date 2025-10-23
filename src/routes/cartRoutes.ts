import express from 'express';
import { protect } from '../middleware/authMiddleware';
import {
    getUserCart,
    saveUserCart,
    clearUserCart,
} from '../controllers/cartController';

const router = express.Router();

router.get('/cart', protect, getUserCart);

router.put('/cart', protect, saveUserCart);

router.delete('/cart', protect, clearUserCart);

export default router;