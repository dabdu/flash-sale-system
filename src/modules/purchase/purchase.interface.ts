import { Document, Types } from "mongoose";
import { IFlashSaleEvent } from "../flashSaleEvent/flashSaleEvent.interface";
import { IUser } from "../user/user.interface";

/**
 * --------------------------
 * Purchase Interfaces
 * --------------------------
 */

// interface is used with Mongoose models
export interface IPurchase extends Document {
  user: Types.ObjectId | IUser;
  flashSaleEvent: Types.ObjectId | IFlashSaleEvent;
  quantity: number;
  purchaseTime: Date;
}

// Interface for creating a new purchase record
export interface IPurchaseCreate {
  user: string; // Typically the user ID as a string
  flashSaleEvent: string; // Flash sale event ID as a string
  quantity: number;
  purchaseTime: Date;
}

// Interface for updating a purchase record (all fields are optional)
export interface IPurchaseUpdate {
  user?: string;
  flashSaleEvent?: string;
  quantity?: number;
  purchaseTime?: Date;
}
