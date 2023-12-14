import { validationResult } from "express-validator";
import { Perdido } from "../models/perdido.js";
import { procesarRegistro } from "../services/procesarRegistro.js";
import { sendNotification } from "../services/sendNotification.js";
import { getIO } from "../config/socket.js";

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

    const datosRegistro = {
      nombre,
      descripcion,
      edad,
      image,
      especie,
      raza,
      ultima_vez,
      recompensa,
      user: req.user._id,
      tipoRegistro: "perdido",
    };

    res.status(202).json({
      mensaje:
        "Su registro está siendo analizado. Se le enviará una notificación.",
      datosRegistro,
    });

    await procesarRegistro(datosRegistro);
  } catch (error) {
    next(error);
  }
};

//@desc Get all perdidos
//@access Public

export const getAllPerdidos = async (req, res, next) => {
  try {
    const perdidos = await Perdido.find({ status: { $eq: "validado" } }).sort({
      date: -1,
    });
    res.send(perdidos);
  } catch (error) {
    next(error);
  }
};

//@desc Get all perdidos via ADMIN
//@access Admin

export const getAllPerdidosAdmin = async (req, res, next) => {
  try {
    const perdidos = await Perdido.find({ status: { $eq: "pendiente" } }).sort({
      date: -1,
    });
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

// Aprobar o rechazar un registro por un Admin

export const updateRegistroPerdidoAdmin = async (req, res, next) => {
  try {
    const perdido = await Perdido.findById(req.params.id);

    if (!perdido) {
      return res
        .status(404)
        .json({ msg: "No existe la mascota que buscas :(" });
    }

    if (perdido.status !== "pendiente") {
      return res
        .status(401)
        .json({ msg: "Este registro ya ha sido procesado por un Admin" });
    }

    const { resultadoAdmin } = req.body;

    let notification;

    if (resultadoAdmin === "rechazado") {
      perdido.status = "rechazado";

      notification = {
        usuario: perdido.user,
        mensaje: "Tu registro ha sido rechazado :(",
        estadoProceso: "rechazado",
        description:
          "Tu registro de mascota perdida no ha pasado los filtros y no es apta para que todo el mundo la vea :(",
        usuarioActioner: "admin",
      };
    }
    if (resultadoAdmin === "validado") {
      perdido.status = "validado";

      notification = {
        usuario: perdido.user,
        mensaje: "Tu registro ha sido aceptado!",
        estadoProceso: "aceptado",
        description:
          "Tu registro de mascota perdida ha pasado los filtros y es apta para que todo el mundo la vea!",
        usuarioActioner: "admin",
      };
    }

    await perdido.save();

    await sendNotification(notification);

    const io = getIO();
    io.emit("notificationRegistro", {
      notification: notification,
    });

    res.status(200).json({
      success: true,
      message: "Registro procesado con Exito",
    });
  } catch (error) {
    console.log({ "Error en el update de perdido": error });
    next(error);
  }
};
