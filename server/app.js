import { config } from "dotenv";
import express from "express";

//IMPORTING ROUTERS
import user from "./routes/user.js";

config({
  path: "./data/config.env",
});

export const app = express();

//using Middlewares
app.use(express.json());

app.use("/api/v1/user", user);
