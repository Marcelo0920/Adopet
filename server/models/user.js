import mongoose from "mongoose";
import validator from "validator";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre es requerido"],
  },
  apellido: {
    type: String,
    required: [true, "El apellido es requerido"],
  },
  email: {
    type: String,
    unique: [true, "Este correo ya esta en uso"],
    validate: validator.isEmail,
  },
  telefono: {
    type: Number,
    unique: [true, "Este numero ya esta en uso"],
    validate: validator.isNumeric,
  },
  password: {
    type: String,
    required: [true, "La contrasenia es requerida"],
    minLength: [6, "La contrasenia debe ser de al menos 6 caracteres"],
  },
  avatar: {
    public_id: String,
    url: String,
  },
});

export const User = mongoose.model("User", schema);
