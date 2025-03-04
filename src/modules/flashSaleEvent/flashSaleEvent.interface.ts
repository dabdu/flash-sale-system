import { Document, Types } from "mongoose";

/**
 * --------------------------
 * Flash Sale Event Interfaces
 * --------------------------
 */

// interface is used with Mongoose models
export interface IFlashSaleEvent extends Document {
  product: Types.ObjectId | IProduct;
  allocatedUnits: number;
  remainingUnits: number;
  saleStart: Date;
  saleEnd: Date;
}

// Interface for creating a new flash sale event
export interface IFlashSaleEventCreate {
  product: string; // Typically the product ID as a string
  allocatedUnits: number;
  remainingUnits: number;
  saleStart: Date;
  saleEnd: Date;
}

// Interface for updating a flash sale event (all fields are optional)
export interface IFlashSaleEventUpdate {
  product?: string;
  allocatedUnits?: number;
  remainingUnits?: number;
  saleStart?: Date;
  saleEnd?: Date;
}
