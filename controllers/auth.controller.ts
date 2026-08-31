import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.ts";
import getErrorMessage from "../utils/getErrorMessage.ts";
import jwt from "jsonwebtoken";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).json({
        message: "one of the mandatory field was skipped",
      });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({
        message: "user already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "user created successfully",
      data: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        isActive: newUser.isActive,
        role: newUser.role,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      data: getErrorMessage(error),
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ where: { email } });
    if (!findUser) {
      return res.status(401).json({
        message: "invalid credentials",
      });
    }

    if (!findUser.isActive) {
      if (findUser.role == "user") {
        return res.status(403).json({
          message: "user not activated",
        });
      }
      return res.status(403).json({
        message: "admin not activated",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "invalid credentials",
      });
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error("secret key not configured");
    }

    const token = jwt.sign(
      {
        id: findUser?.id,
        email: findUser?.email,
        role: findUser?.role,
      },
      secretKey,
      { expiresIn: 3600 },
    );
    res.status(200).json({
      message: "login successful",
      data: {
        token,
        user: {
          id: findUser?.id,
          email: findUser?.email,
          role: findUser?.role,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      data: getErrorMessage(error),
    });
  }
};
