require("dotenv").config();
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import dbconnection from "./config/db";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "/*",
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

const onlineUsers = new Map<string, string>();

io.on("connection", (socket) => {
  socket.on("addUser", (id: string) => {
    onlineUsers.set(id, socket.id);
    console.log("User added:", id);
  });

  socket.on("requestConnection", (toId, fromId) => {
    const socketid = onlineUsers.get(toId);
    if (socketid) io.to(socketid).emit("showPopup", fromId);
  });

  socket.on("reqAnswer", (rid, from, to, isAccepted) => {
    if (isAccepted === true) {
      const socketid = onlineUsers.get(to);
      if (socketid) io.to(socketid).emit("reqAccepted", rid);
    } else {
      const socketid = onlineUsers.get(to);
      if (socketid) io.to(socketid).emit("reqDeclined", null);
    }
  });
});

const url = process.env.URI as string;

dbconnection(url)
  .then(() => {
    httpServer.listen(8080, () => console.log("Server is running fine"));
  })
  .catch((err) => console.log("Error in connection to the database", err));
