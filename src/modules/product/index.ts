import { Router } from "express";
import {
  createProductValidation,
  updateProductValidation,
} from "./product.validation";
import ProductController from "./product.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/admin.middleware";

const router = Router();
const controller = new ProductController();

// Admin-only: Create a new product
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createProductValidation,
  controller.createProduct
);

// Public: Get all products
router.get("/", controller.getProducts);

// Public: Get a single product by id
router.get("/:id", controller.getProduct);

// Admin-only: Update a product
router.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateProductValidation,
  controller.updateProduct
);

// Admin-only: Delete a product
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.updateProduct
);

export default router;
