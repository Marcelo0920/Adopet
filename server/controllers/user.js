import { User } from "../models/user.js";
import { validationResult } from "express-validator";
import { comparePassword, encryptPassword } from "../middlewares/bcrypt.js";
import ErrorHandler from "../utils/error.js";

import { cookiesOptions } from "../utils/features.js";
import { sendToken } from "../utils/features.js";

//LOGIN USER
export const login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ erros: errors.array() });
  }

  const { email, password } = req.body;

  try {
    //Verify if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ error: { msg: "El email o la contrasenia son incorrectos" } });
    }

    //Verify if la contrasenia es correcta
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("Email o contrasenia incorrecta", 400));
    }

    //Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
    };

    sendToken(res, `Bienvenido ${user.name}`, 200, payload);

    /* const token = await generateToken(payload);

    res.json({ token: token, payload: payload }); */
  } catch (error) {
    next(error);
  }
};

//CREATE USER
export const register = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, apellido, email, telefono, password, role, avatar } =
      req.body;

    //verify if user not cuidador
    if (role === "cuidador") {
      res.status(500).json({
        msg: "No puedes asignarte como cuidador, solo un refugio/albergue puede hacerlo",
      });
    }

    //encrypting pass
    const encryptedPassword = await encryptPassword(password);

    let user = new User({
      name,
      apellido,
      email,
      telefono,
      password: encryptedPassword,
      avatar,
    });

    await user.save();

    res.status(201).json({ success: true, message: "registrado con exito" });
  } catch (error) {
    next(error);
  }
};

export const logOut = async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      ...cookiesOptions,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Cerrado sesion con exito",
    });
};

export const getMyProfile = async (req, res, next) => {
  try {
    console.log(req.user);
    const user = await User.findById(req.user._id).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
