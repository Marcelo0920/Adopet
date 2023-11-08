import { User } from "../models/user.js";

export const login = async (req, res, next) => {
  res.send("Login");
};

export const register = async (req, res, next) => {
  res.send("Register");
};
