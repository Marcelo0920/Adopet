let io;

function configureSocket(httpServer) {
  io = httpServer;
  io.on("connection", (socket) => {
    console.log("A user connected");
  });

  console.log("socket started");
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
}

export { configureSocket, getIO };
