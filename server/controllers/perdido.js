import { validationResult } from "express-validator";
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
    const {
      nombre,
      descripcion,
      edad,
      image,
      especie,
      raza,
      ultima_vez,
      recompensa,
    } = req.body;

    const newPerdido = await new Perdido({
      nombre,
      descripcion,
      edad,
      image,
      especie,
      raza,
      ultima_vez,
      recompensa,
    }).save();

    return res.status(200).json({ newPerdido });
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
