import { Router } from "express";
import { authUserValidation, updateUserValidation } from "./user.validation";
import UserController from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/admin.middleware";

const router = Router();
const controller = new UserController();

// Public route: User registration
router.post("/", authUserValidation, controller.createUser);
// Public route: User registration
router.post("/login", authUserValidation, controller.login);

// Admin-only: Get a list of all users (protected by JWT and admin check)
router.get("/", authMiddleware, adminMiddleware, controller.getUsers);

// Admin-only: Get details of a user by id (protected)
router.get("/:id", authMiddleware, controller.getUser);

// Admin-only: Delete a user (protected)
router.delete("/:id", authMiddleware, adminMiddleware, controller.deleteUser);

export default router;
