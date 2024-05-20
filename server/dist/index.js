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
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(() => console.log("Server is running"));
const url = process.env.URI;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.use("/user", user_1.default);
(0, db_1.default)(url)
    .then(() => {
    app.listen(8080, () => console.log("Server is running fine"));
})
    .catch((err) => console.log("Error in connection to the database", err));
