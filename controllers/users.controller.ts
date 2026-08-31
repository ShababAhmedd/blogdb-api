import type { Request, Response } from "express";
import getErrorMessage from "../utils/getErrorMessage.ts";
import User from "../models/user.model.ts";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.status(200).json({
      message: "users data retrieved",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      data: getErrorMessage(error),
    });
  }
};
