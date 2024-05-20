import { Request, Response } from "express";
import { userTypes } from "../types/index";
import User from "../models/userSchema";

async function handlegetallUsers(req: Request, res: Response) {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error in getting Users" });
  }
}
async function getUserById(req: Request, res: Response) {
  try {
    const user = await User.find({ id: req.params.id });
    if (!user) return res.status(400).json({ message: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error in getting Users" });
  }
}

export { handlegetallUsers, getUserById };
