"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: "string",
        required: true,
    },
    password: {
        type: "string",
        required: true,
    },
    username: {
        type: "string",
        required: true,
    },
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
