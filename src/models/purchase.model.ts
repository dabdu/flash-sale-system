import { Schema, model } from "mongoose";
import { IPurchase } from "../modules/purchase/purchase.interface";

const Purchase = new Schema<IPurchase>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    flashSaleEvent: {
      type: Schema.Types.ObjectId,
      ref: "FlashSaleEvent",
      required: true,
    },
    quantity: { type: Number, required: true },
    purchaseTime: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

Purchase.index({ purchaseTime: 1 });

export default model<IPurchase>("Purchase", Purchase);
