let io;
let users = [];

function configureSocket(httpServer) {
  io = httpServer;
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("login", function (data) {
      let userConnected = data.userId;
      users.push(userConnected);
    });
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
