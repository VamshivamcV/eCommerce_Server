// src/utils/seed.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productModel from '../models/productModel';

// Load environment variables
dotenv.config();

const products = [
  {
    title: 'iPhone 14',
    description: 'Apple smartphone',
    price: 999,
    image: 'https://molla.al/wp-content/uploads/2021/10/iPhone_14_Pro_Silver_Pure_Back_iPhone_14_Pro_Silver_Pure_Front_2-up_Screen__USEN-381x450.png',
    category: 'Electronics',
    brand: 'Apple',
    countInStock: 5,
    rating: 4.5,
  },
  {
    title: 'Samsung TV',
    description: 'Smart TV 55 inch',
    price: 599,
    image: 'https://m.media-amazon.com/images/I/71viWVwI0JL._UF1000,1000_QL80_.jpg',
    category: 'Electronics',
    brand: 'Samsung',
    countInStock: 10,
    rating: 4.2,
  },
];

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('⚠️ MONGO_URI not defined in .env');
}

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('🟢 MongoDB connected');

    await productModel.deleteMany();
    await productModel.insertMany(products);

    console.log('✅ Sample products inserted');
    process.exit();
  })
  .catch((err) => {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
  });
