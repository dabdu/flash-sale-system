import { Schema, model } from "mongoose";
import { IProduct } from "../modules/product/product.interface";

const Product = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default model<IProduct>("Product", Product);
