import { Response, Request, NextFunction } from "express";
import ev from "express-validation";
import ej from "express-jwt";
import { ErrorHandler } from "../helpers/errorHandler";
import logger from "../helpers/loggerHelper";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // wrong Mongodb id Error
  if (err.name === "CastError") {
    const message = `Resource Not Found. Inavalid ${err.path}`;
    return res.status(400).json({
      success: false,
      message,
    });
  }

  // Duplicate key Error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    return res.status(400).json({
      success: false,
      message,
    });
  }

  // wrong JWT Error
  if (err.name === "JsonWebTokenError") {
    const message = `JSON Web Token is Invalid, Please Try Again`;
    return res.status(400).json({
      success: false,
      message,
    });
  }

  if (err.name === "UnauthorizedError") {
    let error = err as ej.UnauthorizedError;
    return res.status(error.status).json({
      success: false,
      message: error.inner.message,
    });
  }

  if (err instanceof ev.ValidationError) {
    return res.status(err.statusCode).json({
      success: false,
      message: (err.details.body![0] as any).message,
    });
  }

  if (err.name === "TokenExpiredError") {
    const message = "JSON Web Token is Expired, Please try again";
    return res.status(400).json({
      success: false,
      message,
    });
  }

  if (err instanceof ErrorHandler) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  logger.error(err.message);

  if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
    return res.status(500).send({
      success: false,
      message: "Something went wrong while processing your request",
    });
  } else {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

export default errorMiddleware;
