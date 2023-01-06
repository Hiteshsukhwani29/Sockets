const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*"
  },
});

io.on("connection", (socket) => {
  console.log("socket: ", socket);
  socket.on("chat", (payload) => {
    console.log("payload: ", payload);
    io.emit("chat", payload);
  });
});

server.listen(5001, () => {
  console.log("listening to port 5001");
});
