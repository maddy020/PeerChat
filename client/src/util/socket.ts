import { io } from "socket.io-client";

const socket = io("https://peerchat-110t.onrender.com", {
  withCredentials: true,
});

export default socket;
