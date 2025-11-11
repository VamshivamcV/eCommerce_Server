// src/routes/productRoutes.ts

import express, { Request, Response } from 'express';
import Product, { ProductDocument } from '../models/productModel';

const router = express.Router();

let cache: ProductDocument[] | null = null;
let lastFetch = 0;

router.get('/', async (req: Request, res: Response) => {
  const now = Date.now();

  if (cache && now - lastFetch < 60000){
    return res.json(cache);
  }

  try {
    const products: ProductDocument[] = await Product.find();
    cache = products;
    lastFetch = now;

    return res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found'});
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Server error'});
  }
});

export default router;
