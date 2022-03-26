//Error handler
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    console.log(message, statusCode);

    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
