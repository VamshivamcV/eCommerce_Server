import express from 'express';
import { protect } from '../middleware/authMiddleware';
import { addOrder, getMyOrders } from '../controllers/orderController';

const router = express.Router();

router.post('/', protect, addOrder);
router.get('/myorders', protect, getMyOrders);

export default router;