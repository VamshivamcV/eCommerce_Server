
import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import paymentRoutes from './routes/paymentRoutes';
import webhookRoutes from './routes/webhookRoute';
import cartRoutes from './routes/cartRoutes';

const app = express();

app.use('/api/webhook', webhookRoutes);

app.use(cors());

app.use(express.json());


// ✅ Product Routes
app.use('/api/products', productRoutes);
app.use('/api/users', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', cartRoutes);

export default app;