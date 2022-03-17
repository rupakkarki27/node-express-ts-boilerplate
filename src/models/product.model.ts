import mongoose from "mongoose";

export interface IProduct {
  productName: string;
  productImage: string;
  price: number;
  discount?: boolean;
  discountPercentage?: number;
  description: string;
  unit: string;
  quantity: number;
  available?: boolean;
}

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    productName: { type: String, required: true },
    productImage: String,
    price: { type: Number, required: true },
    discount: { type: Boolean, default: false },
    discountPercentage: { type: Number, default: 0 },
    description: String,
    unit: String,
    quantity: Number,
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct & mongoose.Document>(
  "Product",
  ProductSchema
);

export default Product;
