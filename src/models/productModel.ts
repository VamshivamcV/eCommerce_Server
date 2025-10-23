import mongoose, { Schema, Document, model } from 'mongoose';

// Define the Product interface
export interface ProductDocument extends Document {
  title: string;
  description: string;
  price: number;
  image: string;
  brand: string;
  category: string;
  countInStock: number;
  rating: number;
}

// Define the schema
const productSchema = new Schema<ProductDocument>(
  {
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    brand: { type: String },
    category: { type: String },
    countInStock: { type: Number },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Create the model
const Product = model<ProductDocument>('Product', productSchema);

export default Product;
