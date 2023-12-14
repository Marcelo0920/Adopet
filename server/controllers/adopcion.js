import { validationResult } from "express-validator";
import { Adopcion } from "../models/adopcion.js";
import { procesarRegistro } from "../services/procesarRegistro.js";
import { sendNotification } from "../services/sendNotification.js";
import { getIO } from "../config/socket.js";

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
    const adopcion = await Adopcion.find({ status: { $eq: "validado" } }).sort({
      date: -1,
    });
    res.send(adopcion);
  } catch (error) {
    next(error);
  }
};

//@desc Get all adopcion via ADMIN
//@access Admin

export const getAllAdopcionAdmin = async (req, res, next) => {
  console.log("GET ALL ADOPCIONES ADMIN");
  try {
    const adopcion = await Adopcion.find({ status: { $eq: "pendiente" } }).sort(
      {
        date: -1,
      }
    );
    console.log(adopcion);
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

// Aprobar o rechazar un registro por un Admin

export const updateRegistroAdopcionAdmin = async (req, res, next) => {
  console.log("UPDATE REGISTRO ADOPCION");
  try {
    console.log(req.params.id);
    const adopcion = await Adopcion.findById(req.params.id);

    console.log(adopcion);

    if (!adopcion) {
      return res
        .status(404)
        .json({ msg: "No existe la mascota que buscas :(" });
    }

    if (adopcion.status !== "pendiente") {
      return res
        .status(401)
        .json({ msg: "Este registro ya ha sido procesado por un Admin" });
    }

    const { resultadoAdmin } = req.body;

    let notification;

    if (resultadoAdmin === "rechazado") {
      adopcion.status = "rechazado";

      notification = {
        usuario: adopcion.user,
        mensaje: "Tu registro ha sido rechazado :(",
        estadoProceso: "rechazado",
        description:
          "Tu registro de mascota en adopcion no ha pasado los filtros y no es apta para que todo el mundo la vea :(",
        usuarioActioner: "admin",
      };
    }
    if (resultadoAdmin === "validado") {
      adopcion.status = "validado";

      notification = {
        usuario: adopcion.user,
        mensaje: "Tu registro ha sido aceptado!",
        estadoProceso: "aceptado",
        description:
          "Tu registro de mascota en adopcion ha pasado los filtros y es apta para que todo el mundo la vea!",
        usuarioActioner: "admin",
      };
    }

    await adopcion.save();

    await sendNotification(notification);

    const io = getIO();
    io.emit("notificationRegistro", {
      notification: notification,
    });

    io.emit("actualizacionRegistrosAdopcion", {
      tipoRegistro: "adopcion",
      data: adopcion,
    });

    res.status(200).json({
      success: true,
      message: "Registro procesado con Exito",
    });
  } catch (error) {
    console.log({ "Error en el update de adopcion": error });
    next(error);
  }
};
