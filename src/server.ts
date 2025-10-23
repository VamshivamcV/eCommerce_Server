// src/server.ts
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("⚠️ MONGO_URI not defined in .env");
}

// ✅ Mongoose connection with correct options
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ DB connection error:', err));

// ✅ Root Route
app.get('/', (req: Request, res: Response) => {
  res.send('API is working');
});


// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
