export class ApiError extends Error {
	constructor(message, exception, errors = []) {
		super(message);
		this.name = 'ApiError';
		this.exception = exception;
		this.errors = errors;
	}
}