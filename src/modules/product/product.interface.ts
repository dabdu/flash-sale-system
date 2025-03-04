import { Document, Types } from "mongoose";

/**
 * --------------------------
 * Product Interfaces
 * --------------------------
 */

// interface is used with Mongoose models
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
}

// Interface for creating a new product
export interface IProductCreate {
  name: string;
  description: string;
  price: number;
}

// Interface for updating a product (all fields are optional)
export interface IProductUpdate {
  name?: string;
  description?: string;
  price?: number;
}
