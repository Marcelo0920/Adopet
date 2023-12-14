import express from "express";
import {
  getAdopcion,
  getAllAdopcion,
  getAllAdopcionAdmin,
  registrarAdopcion,
  updateRegistroAdopcionAdmin,
} from "../controllers/adopcion.js";
import { mascotaAdopcion } from "../middlewares/validator.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", isAuthenticated, registrarAdopcion);

router.get("/", getAllAdopcion);

router.get("/admin", isAuthenticated, isAdmin, getAllAdopcionAdmin);

router.put(
  "/registroadmin/:id",
  isAuthenticated,
  isAdmin,
  updateRegistroAdopcionAdmin
);

router.get("/:id", getAdopcion);

export default router;
