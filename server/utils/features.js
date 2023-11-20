import { generateToken } from "../middlewares/bcrypt.js";

export const sendToken = async (res, message, statusCode, payload) => {
  const token = await generateToken(payload);

  res
    .status(statusCode)
    .cookie("token", token, {
      ...cookiesOptions,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 10000),
    })
    .json({
      success: true,
      message: message,
    });
};

export const cookiesOptions = {
  secure: process.env.NODE_ENV === "Development" ? false : true,
  httpOnly: process.env.NODE_ENV === "Development" ? false : true,
  sameSite: process.env.NODE_ENV === "Development" ? false : "none",
};
