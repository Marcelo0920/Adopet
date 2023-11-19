import mongoose from "mongoose";
// import validator from "validator";

const perdidoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },

  especie: {
    type: String,
    required: true,
  },

  raza: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  edad: {
    type: Number,
    required: true,
  },
  image: [String],
  //visto por ultima vez
  ultima_vez: {
    type: String,
    required: true,
  },
  recompensa: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pendiente", "validado", "rechazado", "observacion"],
  },
});

export const Perdido = mongoose.model("perdido", perdidoSchema);
