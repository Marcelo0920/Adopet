import { check, validationResult } from "express-validator";

export const registerUser = [
  check("name", "El nombre es requerido").not().isEmpty(),
  check("apellido", "El apellido es requerido").not().isEmpty(),
  check("email", "El email es requerido").notEmpty().isEmail(),
  check("password", "La contrasenia debe ser de 6 o mas caracteres").isLength({
    min: 6,
  }),
  check("telefono", "Solo numeros!").notEmpty().isInt(),
];

export const loginUser = [
  check("email", "El email es requerido").notEmpty().isEmail(),
  check("password", "La contrasenia debe ser de 6 o mas caracteres").isLength({
    min: 6,
  }),
];
