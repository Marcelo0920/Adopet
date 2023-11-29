import { app } from "./app.js";
import { connectDB } from "./config/database.js";
import { Server as SocketServer } from "socket.io";
import { configureSocket } from "./config/socket.js";

connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `server listening on port: ${process.env.PORT}, in ${process.env.NODE_ENV}`
  );
});

const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
});

configureSocket(io);
