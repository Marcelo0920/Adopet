import express from "express";
import { logOut, login, register } from "../controllers/user.js";
import { loginUser, registerUser } from "../middlewares/validator.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", loginUser, login);

router.post("/register", registerUser, register);

router.get("/logout", isAuthenticated, logOut);

export default router;
