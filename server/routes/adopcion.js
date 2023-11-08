import express from "express";
import { upload } from "../config/multer.js";
import { registrarAdopcion } from "../controllers/adopcion.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([{ name: "image", maxCount: 3 }]),
  registrarAdopcion
);

export default router;
