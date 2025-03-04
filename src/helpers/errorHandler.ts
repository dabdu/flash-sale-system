export class ErrorHandler extends Error {
	public statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.message = message;
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class BadRequestException extends ErrorHandler {
	constructor(message: string) {
		super(message, 400);
	}
}

export class UnauthorizedException extends ErrorHandler {
	constructor(message: string) {
		super(message, 401);
	}
}

export class NotFoundException extends ErrorHandler {
	constructor(message: string) {
		super(message, 404);
	}
}

export class InternalServerErrorException extends ErrorHandler {
	constructor(message: string) {
		super(message, 500);
	}
}
