import mongoose, { Schema } from "mongoose";

const notificationSchema = new mongoose.Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  mensaje: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    enum: ["unread", "read"],
    default: "unread",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    default: "",
  },
  usuarioActioner: {
    type: String,
    required: true,
  },
});

export const Notification = mongoose.model("notification", notificationSchema);
