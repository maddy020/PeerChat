require("dotenv").config();
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import dbconnection from "./config/db";
import http from "http";
import { ExpressPeerServer } from "peer";

const app = express();

const server = http.createServer(() => console.log("Server is running"));

const url = process.env.URI as string;

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

dbconnection(url)
  .then(() => {
    app.listen(8080, () => console.log("Server is running fine"));
  })
  .catch((err) => console.log("Error in connection to the database", err));
