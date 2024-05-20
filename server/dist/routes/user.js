"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const route = express_1.default.Router();
const middleware_1 = __importDefault(require("../middleware"));
route.get("/getallUsers", middleware_1.default, user_1.handlegetallUsers);
route.get("/:id", user_1.getUserById);
exports.default = route;
