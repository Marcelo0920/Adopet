import express from "express";
import { mascotaAdopcion } from "../middlewares/validator.js";
import {
  getAllPerdidos,
  getAllPerdidosAdmin,
  getPerdido,
  registrarPerdido,
  updateRegistroPerdidoAdmin,
} from "../controllers/perdido.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", mascotaAdopcion, isAuthenticated, registrarPerdido);

router.get("/", getAllPerdidos);

router.get("/:id", getPerdido);

router.put("/registroadmin/:id", updateRegistroPerdidoAdmin);

router.get("/admin", getAllPerdidosAdmin);

export default router;
