import { validationResult } from "express-validator";
import { Adopcion } from "../models/adopcion.js";

//@desc POST mascota adopcion
//@access User

export const registrarAdopcion = async (req, res, next) => {
  //validando los datos y mostrando los errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { nombre, descripcion, edad, image, especie, raza } = req.body;
    //const image = await req.files.image;

    console.log(req.body);

    const newAdopcion = await new Adopcion({
      nombre,
      descripcion,
      edad,
      image,
      especie,
      raza,
    }).save();

    return res.status(200).json({ newAdopcion });
    // }
  } catch (error) {
    console.log("aca");
    next(error);
    console.log("por acaaaaa");
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
