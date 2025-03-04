import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error";
import router from "./modules";
import { BadRequestException } from "./helpers/errorHandler";

const app = express();
// Body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// cookie  Parser
app.use(cookieParser());
app.use(helmet());
// cors => cross origin resource sharing
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

// Routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up and running! 🚀");
});

// unknown Routes
app.all("*", (req: Request, res: Response) => {
  throw new BadRequestException(`${req.originalUrl} not found`);
});

// Error MiddleWare
app.use(errorMiddleware);

export default app;
