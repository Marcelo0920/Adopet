import { Notification } from "../models/notifications.js";

export const sendNotification = async (notification) => {
  try {
    const newNotification = await new Notification({
      usuario: notification.usuario,
      mensaje: notification.mensaje,
      estadoProceso: notification.estadoProceso,
      description: notification.description,
      usuarioActioner: notification.usuarioActioner,
    }).save();

    console.log(`Nueva notificacion creada ${newNotification}`);
  } catch (error) {
    console.log(error);
    console.error("Error al enviar la notificacion");
    throw error;
  }
};
