import { User } from "../models/user.js";
import ErrorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  //const { token } = req.cookies;

  const token = req.header("x-access-token");

  if (!token) {
    return next(new ErrorHandler("No autenticado", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.user.id);
  next();
};

export const isAdmin = async (req, res, next) => {
  try {
    console.log(req.user);
    if (req.user.role !== "admin") {
      return next(new ErrorHandler("Necesitas permisos de Admin", 401));
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
