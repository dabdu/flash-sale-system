import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  auth?: {
    id: string;
    email: string;
    userType: "admin" | "user";
  };
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // Expect the token in the Authorization header in the form "Bearer <token>"
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: "Unauthorized. Invalid token format." });
  }

  try {
    // Using JWT secret (typically stored in process.env.JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    req.auth = {
      id: decoded._id,
      email: decoded.email,
      userType: decoded.userType,
    };
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized. Invalid token." });
  }
};
