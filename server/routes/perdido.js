import express from "express";
import { mascotaAdopcion } from "../middlewares/validator.js";
import {
  getAllPerdidos,
  getPerdido,
  registrarPerdido,
} from "../controllers/perdido.js";

const router = express.Router();

router.post("/", mascotaAdopcion, registrarPerdido);

router.get("/", getAllPerdidos);

router.get("/:id", getPerdido);

export default router;
