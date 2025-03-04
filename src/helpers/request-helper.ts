import axios from "axios";
import logger from "./loggerHelper";
import { InternalServerErrorException } from "./errorHandler";

export const verifyPaystackTransaction = async (reference: string, secret: string) => {
	try {
		const headers = {
			Authorization: `Bearer ${secret}`,
			"Content-Type": "application/json",
		};

		return await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
			headers,
		});
	} catch (err: any) {
		logger.error(err.message);
		throw new InternalServerErrorException("something went wrong");
	}
};
