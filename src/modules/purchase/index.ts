import { Router } from "express";
import PurchaseController from "./purchase.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/admin.middleware";
import {
  createPurchaseValidation,
  updatePurchaseValidation,
} from "./purchase.validation";

const router = Router();
const controller = new PurchaseController();

// Public: Create a new purchase (requires user authentication)
router.post(
  "/",
  authMiddleware,
  createPurchaseValidation,
  controller.createPurchase
);

// Admin-only: Leaderboard API to get all purchases sorted by purchase time
router.get(
  "/leaderboard",
  authMiddleware,
  adminMiddleware,
  controller.getLeaderboard
);

// Admin-only: Get all purchase records
router.get("/", authMiddleware, adminMiddleware, controller.getPurchases);

// Admin-only: Get details of a specific purchase
router.get("/:id", authMiddleware, adminMiddleware, controller.getPurchase);

// Admin-only: Update a purchase record
router.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updatePurchaseValidation,
  controller.updatePurchase
);

export default router;
