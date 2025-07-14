const asyncHandler = require("../../../utils/asyncHandler");
const ErrorHandler = require("../../../utils/errorHandler");
const jwtUtils = require("../../../utils/jwt");

const authToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const getToken = authHeader && authHeader.split(" ")[1];

  if (getToken == null) throw new ErrorHandler("Failed to get token", 403);
  const decoded = jwtUtils.verifyToken(getToken, process.env.JWT_SECRET);
  if (!decoded) throw ErrorHandler("Unauthorized", 403);
  req.user = decoded;
  next();
});

const authForgotPassword = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const getToken = authHeader && authHeader.split(" ")[1];

  if (getToken == null) throw new ErrorHandler("Failed to get token", 403);
  const decoded = jwtUtils.verifyToken(getToken, process.env.JWT_SECRET);
  if (!decoded) throw ErrorHandler("Unauthorized", 403);
  req.reset = decoded
})

const authRole = (...allowedRoles) => {
  return asyncHandler(async (req, res, next) => {
    const role = req.user?.role;

    if (!role || !allowedRoles.includes(role)) {
      throw new ErrorHandler("Unauthorized", 403);
    }

    next();
  });
};

module.exports = { authToken, authForgotPassword, authRole };
