import mongoose from "mongoose";
import logger from "../helpers/loggerHelper";

const dbURL: string = process.env.MONGODB_URI || "";

const connectDB = async () => {
	try {
		await mongoose.connect(dbURL);
		logger.info("Connected to database");
	} catch (error: any) {
		logger.error(error.message);
		setTimeout(connectDB, 5000);
	}
};
export default connectDB;
