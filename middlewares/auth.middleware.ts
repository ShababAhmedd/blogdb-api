import type { NextFunction, Request, Response } from "express";
import getErrorMessage from "../utils/getErrorMessage.ts";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

export const authMiddleWare = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({
        message: "auth token required",
      });
    }

    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(403).json({
        message: "auth token required",
      });
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      throw new Error("secret key is not configured");
    }

    req.user = jwt.verify(token, secretKey);
    return next();
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      data: getErrorMessage(error),
    });
  }
};

export const isAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const role =
    typeof req.user === "object" && req.user != null
      ? req.user.role
      : undefined;

  if (role !== "admin") {
    res.status(403).json({
      message: "admins only. access denied.",
    });
  }

  return next();
};
