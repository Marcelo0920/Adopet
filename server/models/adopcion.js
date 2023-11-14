import mongoose from "mongoose";
// import validator from "validator";

const adopcionSchema = new mongoose.Schema({
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
});

export const Adopcion = mongoose.model("Adopcion", adopcionSchema);
