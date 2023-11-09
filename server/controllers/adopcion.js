import { validationResult } from "express-validator";
import { Adopcion } from "../models/adopcion.js";
import { uploadFile } from "../util/uploadFile.js";

export const registrarAdopcion = async (req, res) => {
  //validando los datos y mostrando los errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const body = req.body;
    const image = await req.files.image;

    if (image && image.length > 0) {
      let imgArr = [];
      for (let i = 0; i < image.length; i++) {
        imgArr.push(await uploadFile(image[i]));
      }
      const newAdopcion = await new Adopcion({
        nombre: body.nombre,
        descripcion: body.descripcion,
        edad: parseInt(body.edad),
        image: imgArr,
        especie: body.especie,
        raza: body.raza,
      }).save();

      return res.status(200).json({ newAdopcion });
    }

    res.status(400).json({ message: "Se debe enviar una imagen" });
  } catch (error) {
    next(error);
  }
};
