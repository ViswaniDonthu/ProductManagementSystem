
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // mark as known error
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
