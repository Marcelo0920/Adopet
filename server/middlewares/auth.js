import { User } from "../models/user.js";
import ErrorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  //const { token } = req.cookies;

  const token = req.header("x-access-token");

  console.log(token);

  if (!token) {
    return next(new ErrorHandler("No autenticado", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  console.log(decodedData);

  req.user = await User.findById(decodedData.user.id);
  next();
};
