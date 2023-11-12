import { User } from "../models/user.js";
import { validationResult } from "express-validator";
import {
  comparePassword,
  encryptPassword,
  generateToken,
} from "../middlewares/bcrypt.js";
import { uploadFile } from "../util/uploadFile.js";

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
      return res
        .status(400)
        .json({ msg: "El email o la contrasenia son incorrectos" });
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

    const token = await generateToken(payload);

    res.json({ token: token, payload: payload });
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
    const { name, apellido, email, telefono, password, role } = req.body;

    //verify if user not cuidador
    if (role === "cuidador") {
      res.status(500).json({
        msg: "No puedes asignarte como cuidador, solo un refugio/albergue puede hacerlo",
      });
    }

    const avatar = await req.files.image;

    if (avatar) {
      avatar = await uploadFile(avatar);
      console.log(avatar);
    }

    //add cloudinary here

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

    console.log(user);
    res.status(201).json({ success: true, message: "registrado con exito" });
  } catch (error) {
    next(error);
  }
};
