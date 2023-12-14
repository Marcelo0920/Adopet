import { validationResult } from "express-validator";
import { Adopcion } from "../models/adopcion.js";
import { procesarRegistro } from "../services/procesarRegistro.js";

//@desc POST mascota adopcion
//@access User

export const registrarAdopcion = async (req, res, next) => {
  //validando los datos y mostrando los errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("VALIDATION ERROR");
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { nombre, descripcion, edad, image, especie, raza, sexo, mood } =
      req.body;

    const datosRegistro = {
      nombre,
      descripcion,
      edad,
      especie,
      raza,
      image,
      sexo,
      mood,
      tipoRegistro: "adopcion",
      user: req.user._id,
    };

    res.status(202).json({
      mensaje:
        "Su registro está siendo analizado. Se le enviará una notificación.",
      datosRegistro,
    });

    await procesarRegistro(datosRegistro);

    // }
  } catch (error) {
    next(error);
  }
};

//@desc Get all adopcion
//@access Public

export const getAllAdopcion = async (req, res, next) => {
  try {
    const adopcion = await Adopcion.find().sort({ date: -1 });
    res.send(adopcion);
  } catch (error) {
    next(error);
  }
};

//@desc Get perdido by ID
//@access Public

export const getAdopcion = async (req, res, next) => {
  try {
    const adopcion = await Adopcion.findById(req.params.id);

    if (!adopcion) {
      return res
        .status(404)
        .json({ msg: "No existe la mascota que buscas :(" });
    }

    res.send(adopcion);
  } catch (error) {
    next(error);
  }
};
