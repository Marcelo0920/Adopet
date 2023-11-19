import express from "express";
import {
  getAdopcion,
  getAllAdopcion,
  registrarAdopcion,
} from "../controllers/adopcion.js";
import { mascotaAdopcion } from "../middlewares/validator.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", isAuthenticated, mascotaAdopcion, registrarAdopcion);

router.get("/", getAllAdopcion);

router.get("/:id", getAdopcion);

export default router;
