import express from "express";
import {
  getAdopcion,
  getAllAdopcion,
  registrarAdopcion,
} from "../controllers/adopcion.js";
import { mascotaAdopcion } from "../middlewares/validator.js";

const router = express.Router();

router.post("/", mascotaAdopcion, registrarAdopcion);

router.get("/", getAllAdopcion);

router.get("/:id", getAdopcion);

export default router;
