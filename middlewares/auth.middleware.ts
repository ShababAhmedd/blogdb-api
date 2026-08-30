import type { NextFunction, Request, Response } from "express";
import getErrorMessage from "../utils/getErrorMessage.ts";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

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
