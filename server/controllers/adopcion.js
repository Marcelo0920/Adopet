import { validationResult } from "express-validator";
import { Adopcion } from "../models/adopcion.js";
import { uploadFile } from "../util/uploadFile.js";

//@desc POST mascota adopcion
//@access User

export const registrarAdopcion = async (req, res, next) => {
  //validando los datos y mostrando los errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const body = req.body;
    //const image = await req.files.image;

    console.log(req.body);

    // if (image && image.length > 0) {
    let imgArr = [];
    if (image && image.length > 0) {
      for (let i = 0; i < image.length; i++) {
        imgArr.push(await uploadFile(image[i]));
      }
    }

    const newAdopcion = await new Adopcion({
      nombre: body.nombre,
      descripcion: body.descripcion,
      edad: parseInt(body.edad),
      image: imgArr,
      especie: body.especie,
      raza: body.raza,
      image: body.image,
    }).save();

    return res.status(200).json({ newAdopcion });
    // }

    // res.status(400).json({ message: "Se debe enviar una imagen" });
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
