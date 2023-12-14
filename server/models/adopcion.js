import mongoose from "mongoose";
// import validator from "validator";

const adopcionSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
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
  date: {
    type: Date,
    default: Date.now,
  },
  mood: {
    type: String,
    enum: ["hiper-activo", "activo", "calmado", "dormilon"],
  },
  sexo: {
    type: String,
    enum: ["macho", "hembra"],
  },
  status: {
    type: String,
    enum: ["pendiente", "validado", "rechazado", "adoptado"],
    default: "pendiente",
  },
  ubicacion: {
    type: String,
  },
});

export const Adopcion = mongoose.model("Adopcion", adopcionSchema);
