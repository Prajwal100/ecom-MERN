// checks if user is authenticated or not;
const User = require("../models/user");
const catchAsyncErrors = require("./cacheAsyncError");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookie;

  if (!token) {
    return next(new ErrorHandler("Login first to access this resources", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
});
