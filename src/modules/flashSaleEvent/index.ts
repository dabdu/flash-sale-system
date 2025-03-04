import { Router } from "express";
import {
  createFlashSaleEventValidation,
  updateFlashSaleEventValidation,
} from "./flashSaleEvent.validation";
import FlashSaleEventController from "./flashSaleEvent.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/admin.middleware";

const router = Router();
const controller = new FlashSaleEventController();

// Admin-only: Create a new flash sale event
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createFlashSaleEventValidation,
  controller.createFlashSaleEvent
);

// Public: Get all flash sale events
router.get("/", controller.getFlashSaleEvents);

// Public: Get details of a specific flash sale event
router.get("/:id", controller.getFlashSaleEvent);

// Admin-only: Update a flash sale event
router.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateFlashSaleEventValidation,
  controller.updateFlashSaleEvent
);

// Admin-only: Delete a flash sale event
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  controller.deleteFlashSaleEvent
);

export default router;
