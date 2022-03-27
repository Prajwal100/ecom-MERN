const ErrorHandler = require("../utils/errorHandler");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    //Wrong mongoose object id error
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid : ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    //Handling mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    //Handling mongoose dublicate ky errors e
    if (err.code === 11000) {
      const message = `Dublicate ${Object.keys(err.keyValue)} entered.`;
      error = new ErrorHandler(message, 400);
    }

    //Handling wrong jwt error;
    if (err.name === "JsonWebTokenError") {
      const message = "Json web token is invalid. Try again later.";
      error = new ErrorHandler(message, 400);
    }

    //Handling expired jwt error;
    if (err.name === "TokenExpiredError") {
      const message = "Json web token is expired. Try again later.";
      error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
      success: false,
      errMessage: error.message || "Internal server error",
    });
  }
};
