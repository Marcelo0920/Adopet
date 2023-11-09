import express from "express";
import { upload } from "../config/multer.js";
import { registrarAdopcion } from "../controllers/adopcion.js";
import { mascotaAdopcion } from "../middlewares/validator.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([{ name: "image", maxCount: 3 }]),
  mascotaAdopcion,
  registrarAdopcion
);

export default router;
