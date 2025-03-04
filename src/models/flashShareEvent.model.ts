import { Schema, model } from "mongoose";
import { IFlashSaleEvent } from "../modules/flashSaleEvent/flashSaleEvent.interface";

const FlashSaleEvent = new Schema<IFlashSaleEvent>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    allocatedUnits: { type: Number, required: true, default: 200 },
    remainingUnits: { type: Number, required: true },
    saleStart: { type: Date, required: true },
    saleEnd: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

FlashSaleEvent.index({ saleStart: 1, saleEnd: 1 });

export default model<IFlashSaleEvent>("FlashSaleEvent", FlashSaleEvent);
