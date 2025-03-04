import "dotenv/config";
import connectDB from "./config/db";
import app from "./app";
import { createServer } from "http";
import logger from "./helpers/loggerHelper";

// Create Server
const server = createServer(app);

server.listen(process.env.PORT, () => {
  logger.info(`Server is Connected with port ${process.env.PORT}`);
  connectDB();
});
