import express from "express";
import userRouter from "./user";
import productRouter from "./product";
import flashSaleEventRouter from "./flashSaleEvent";
import purchaseRouter from "./purchase";

const router = express.Router();

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/flash-sale", flashSaleEventRouter);
router.use("/purchases", purchaseRouter);

export default router;
