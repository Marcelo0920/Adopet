import { Adopcion } from "../models/adopcion.js";
import { Perdido } from "../models/perdido.js";

import { getIO } from "../config/socket.js";

import { sendNotification } from "./sendNotification.js";

//Funcion asincrona para procesar la adopcion en segundo plano
export const procesarRegistro = async (datosRegistro) => {
  try {
    //Simulando procesamiento

    await new Promise((resolve) => setTimeout(resolve, 5000));

    let procesoResult = true;

    if (procesoResult) {
      if (datosRegistro.tipoRegistro === "adopcion") {
        //Saving process
        const newAdopcion = await new Adopcion({
          nombre: datosRegistro.nombre,
          descripcion: datosRegistro.descripcion,
          edad: datosRegistro.edad,
          image: datosRegistro.image,
          especie: datosRegistro.especie,
          raza: datosRegistro.raza,
          sexo: datosRegistro.sexo,
          mood: datosRegistro.mood,
          user: datosRegistro.user,
        }).save();

        const io = getIO();
        if (datosRegistro.status === "validado") {
          io.emit("actualizacionRegistrosAdopcion", {
            tipoRegistro: datosRegistro.tipoRegistro,
            data: datosRegistro,
          });
        }

        console.log("Enviando Notificacion");

        const notification = {
          usuario: datosRegistro.user,
          mensaje: "Creado con exito",
          estadoProceso: "aceptado",
          description: "Tu registro de mascota para adopcion fue acepato",
          usuarioActioner: "sistema",
        };

        await sendNotification(notification);
      }

      if (datosRegistro.tipoRegistro === "perdido") {
        const newPerdido = await new Perdido({
          nombre: datosRegistro.nombre,
          descripcion: datosRegistro.descripcion,
          edad: datosRegistro.edad,
          image: datosRegistro.image,
          especie: datosRegistro.especie,
          raza: datosRegistro.raza,
          ultima_vez: datosRegistro.ultima_vez,
          recompensa: datosRegistro.recompensa,
          user: datosRegistro.user,
        }).save();

        const io = getIO();
        io.emit("actualizacionRegistrosPerdido", {
          tipoRegistro: datosRegistro.tipoRegistro,
          data: datosRegistro,
        });

        console.log("Enviando Notificacion");

        const notification = {
          usuario: datosRegistro.user,
          mensaje: "Creado con exito",
          estadoProceso: "aceptado",
          description: "Tu registro de mascota para perdido fue acepato",
          usuarioActioner: "sistema",
        };

        await sendNotification(notification);
      }
    }

    if (procesoResult === false) {
      await sendNotification({
        usuario: datosRegistro.user,
        mensaje: "Tu solicitud de registro fue rechazada",
        estadoProceso: "rechazado",
        description: "Esta mascota ya existe en el sistema",
        usuarioActioner: "sistema",
      });
    }

    console.log("Procesamiento completo ");
  } catch (error) {
    console.log(error);
    console.error("Error durante el procesamiento");
  }
};
