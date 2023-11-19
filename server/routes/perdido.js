import express from "express";
import { mascotaAdopcion } from "../middlewares/validator.js";
import {
  getAllPerdidos,
  getPerdido,
  registrarPerdido,
} from "../controllers/perdido.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", mascotaAdopcion, isAuthenticated, registrarPerdido);

router.get("/", getAllPerdidos);

router.get("/:id", getPerdido);

export default router;
