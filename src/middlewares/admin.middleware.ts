import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth.middleware";

export function adminMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.auth) {
    return res
      .status(401)
      .json({ error: "Unauthorized. User not authenticated." });
  }

  if (req.auth.userType !== "admin") {
    return res.status(403).json({ error: "Forbidden. Admins only." });
  }

  next();
}
