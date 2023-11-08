import mongoose from "mongoose";
// import validator from "validator";

const schema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es requerido"],
  },
  descripcion: {
    type: String,
    required: [true, "La descripción es requerida"],
  },

  especie: {
    type: String,
    required: [true, "La especie es requerida"],
  },

  raza: {
    type: String,
  },

  edad: {
    type: Number,
    // validate: validator.isNumeric,
  },
  image: {
    type: Array,
    default: [],
  },
});

export const Adopcion = mongoose.model("Adopcion", schema);
