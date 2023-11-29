import { config } from "dotenv";
import express from "express";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

//IMPORTING ROUTERS
import user from "./routes/user.js";
import adopcion from "./routes/adopcion.js";
import perdido from "./routes/perdido.js";
import cookieParser from "cookie-parser";

config({
  path: "./config/config.env",
});

export const app = express();

//using Middlewares

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Using routes
app.use("/api/v1/user", user);
app.use("/api/v1/adopcion", adopcion);
app.use("/api/v1/perdido", perdido);

// Using Error Middleware
app.use(errorMiddleware);
