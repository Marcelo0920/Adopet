import { generateToken } from "../middlewares/bcrypt.js";

export const sendToken = async (res, message, statusCode, payload) => {
  const token = await generateToken(payload);

  res
    .status(statusCode)
    .cookie("token", token, {
      ...cookiesOptions,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    })
    .json({
      success: true,
      token: token,
      user: {
        name: payload.user.name,
        role: payload.user.role,
        email: payload.user.email,
      },
      message: message,
    });
};

export const cookiesOptions = {
  secure: process.env.NODE_ENV === "Development" ? false : true,
  httpOnly: process.env.NODE_ENV === "Development" ? false : true,
  sameSite: process.env.NODE_ENV === "Development" ? false : "none",
};
``;
