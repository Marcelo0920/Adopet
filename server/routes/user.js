import express from "express";
import { login, register } from "../controllers/user.js";
import { loginUser, registerUser } from "../middlewares/validator.js";
import { upload } from "../config/multer.js";

const router = express.Router();

router.post("/login", loginUser, login);

router.post(
  "/register",
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  registerUser,
  register
);

export default router;
