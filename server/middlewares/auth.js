import { User } from "../models/user.js";
import ErrorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } =
    req.cookies ||
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"];

  if (!token) {
    return next(new ErrorHandler("No autenticado", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.user.id);
  next();
};
