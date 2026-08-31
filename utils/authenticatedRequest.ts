import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

export type { AuthenticatedRequest };
