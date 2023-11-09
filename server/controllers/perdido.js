import { validationResult } from "express-validator";
import { uploadFile } from "../util/uploadFile.js";
import { Perdido } from "../models/perdido.js";

//@desc POST mascota perdida
//@access User

export const registrarPerdido = async (req, res) => {
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
      const newPerdido = await new Perdido({
        nombre: body.nombre,
        descripcion: body.descripcion,
        edad: parseInt(body.edad),
        image: imgArr,
        especie: body.especie,
        raza: body.raza,
        ultima_vez: body.ultima_vez,
        recompensa: body.recompensa,
      }).save();

      return res.status(200).json({ newPerdido });
    }

    res.status(400).json({ message: "Se debe enviar una imagen" });
  } catch (error) {
    next(error);
  }
};

//@desc Get all perdidos
//@access Public

export const getAllPerdidos = async (req, res, next) => {
  try {
    const perdidos = await Perdido.find().sort({ date: -1 });
    res.send(perdidos);
  } catch (error) {
    next(error);
  }
};

//@desc Get perdido by ID
//@access Public

export const getPerdido = async (req, res, next) => {
  try {
    const perdido = await Perdido.findById(req.params.id);

    if (!perdido) {
      return res
        .status(404)
        .json({ msg: "No existe la mascota que buscas :(" });
    }

    res.send(perdido);
  } catch (error) {
    next(error);
  }
};
