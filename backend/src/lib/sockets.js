import http from "http";
import { Server } from "socket.io";
import app from "../app.js";
import { CORS_ORIGIN } from "../constants.js";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: CORS_ORIGIN,
  },
});

let onlineUsers = {};

function getSocketId(userId) {
  return onlineUsers[userId];
}

io.on("connection", async (socket) => {
  try {
    const userId = socket.handshake.query.userId;

    console.log("Client connected with userId:", userId);
    if (userId) {
      onlineUsers[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(onlineUsers));

    socket.on("disconnect", async () => {
      console.log("Client disconnected with userId:", userId);
      delete onlineUsers[userId];

      io.emit("getOnlineUsers", Object.keys(onlineUsers));
    });
  } catch (error) {
    console.log("Error on connecting client:", error.message);
  }
});

export { server, io, getSocketId };
