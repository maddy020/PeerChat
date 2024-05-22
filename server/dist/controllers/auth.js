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
exports.handleSignup = exports.handleLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function handleLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            const user = yield userSchema_1.default.findOne({ username });
            if (!user)
                return res.status(404).json({ message: "User not found" });
            const hashedpassword = user.password;
            const validPassword = yield bcrypt_1.default.compare(password, hashedpassword);
            if (!validPassword)
                return res.status(401).json({ message: "Invalid Credentials" });
            const id = user._id;
            const token = jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET);
            return res
                .status(201)
                .json({ message: "User Logged In", token: token, id: id });
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Unauthorized" });
        }
    });
}
exports.handleLogin = handleLogin;
function handleSignup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, username, password } = req.body;
            const existingUser = yield userSchema_1.default.findOne({ username });
            if (existingUser != null)
                return res.status(404).json({ message: "User already exist" });
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedpassword = yield bcrypt_1.default.hash(password, salt);
            const user = yield userSchema_1.default.create({
                name,
                username,
                password: hashedpassword,
                peerId: name,
            });
            const id = user._id;
            const token = jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET);
            return res.status(201).json({ message: "User Created", token: token });
        }
        catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Error in signup" });
        }
    });
}
exports.handleSignup = handleSignup;
