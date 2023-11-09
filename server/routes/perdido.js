import express from "express";
import { upload } from "../config/multer.js";
import { mascotaAdopcion } from "../middlewares/validator.js";
import {
  getAllPerdidos,
  getPerdido,
  registrarPerdido,
} from "../controllers/perdido.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([{ name: "image", maxCount: 3 }]),
  mascotaAdopcion,
  registrarPerdido
);

router.get("/", getAllPerdidos);

router.get("/:id", getPerdido);

export default router;
