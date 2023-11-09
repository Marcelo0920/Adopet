import { config } from "dotenv";
import express from "express";
import { errorMiddleware } from "./middlewares/error.js";

//IMPORTING ROUTERS
import user from "./routes/user.js";
import adopcion from "./routes/adopcion.js";
import perdido from "./routes/perdido.js";

config({
  path: "./config/config.env",
});

export const app = express();

//using Middlewares
app.use(express.json());

//Using routes
app.use("/api/v1/user", user);
app.use("/api/v1/adopcion", adopcion);
app.use("/api/v1/perdido", perdido);

// Using Error Middleware
app.use(errorMiddleware);
