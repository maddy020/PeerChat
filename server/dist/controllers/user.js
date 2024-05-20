"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.handlegetallUsers = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
function handlegetallUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield userSchema_1.default.find();
            return res.status(200).json(users);
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Error in getting Users" });
        }
    });
}
exports.handlegetallUsers = handlegetallUsers;
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userSchema_1.default.find({ id: req.params.id });
            if (!user)
                return res.status(400).json({ message: "User not found" });
            return res.status(200).json(user);
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Error in getting Users" });
        }
    });
}
exports.getUserById = getUserById;
