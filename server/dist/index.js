"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const db_1 = __importDefault(require("./config/db"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "https://peer-chat-seven.vercel.app",
        credentials: true,
    },
});
app.use((0, cors_1.default)({
    origin: "https://peer-chat-seven.vercel.app",
}));
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.use("/user", user_1.default);
const onlineUsers = new Map();
io.on("connection", (socket) => {
    socket.on("addUser", (id) => {
        onlineUsers.set(id, socket.id);
        console.log("User added:", id);
    });
    socket.on("requestConnection", (toId, fromId) => {
        const socketid = onlineUsers.get(toId);
        if (socketid)
            io.to(socketid).emit("showPopup", fromId);
    });
    socket.on("reqAnswer", (rid, from, to, isAccepted) => {
        if (isAccepted === true) {
            const socketid = onlineUsers.get(to);
            if (socketid)
                io.to(socketid).emit("reqAccepted", rid);
        }
        else {
            const socketid = onlineUsers.get(to);
            if (socketid)
                io.to(socketid).emit("reqDeclined", null);
        }
    });
});
const url = process.env.URI;
(0, db_1.default)(url)
    .then(() => {
    httpServer.listen(8080, () => console.log("Server is running fine"));
})
    .catch((err) => console.log("Error in connection to the database", err));
