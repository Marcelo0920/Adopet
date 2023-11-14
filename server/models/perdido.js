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
});

export const Perdido = mongoose.model("perdido", perdidoSchema);
