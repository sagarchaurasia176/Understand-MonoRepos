import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.json());

const server = http.createServer(app);

//Socket-io | connections
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    // frontend url
  },
});

// Socket-connection on
io.on("connection", (socket) => {
  console.log("A user connected");
  //Listen to chat message
  socket.on("chat message", (msg) => {
    console.log("message received");
    io.emit("chat message", msg);
  });
  // disconnect the message
  io.on("disconnect", () => {
    console.log("user disconnected");
  });
});

 server.listen(5000, () => {
  console.log("WebSocket server running on port 4000");
});