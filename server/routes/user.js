import express from "express";
import { login, register } from "../controllers/user.js";
import { loginUser, registerUser } from "../middlewares/validator.js";

const router = express.Router();

router.post("/login", loginUser, login);

router.post("/register", registerUser, register);

export default router;
