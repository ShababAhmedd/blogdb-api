import { Router } from "express";
import {
  getUserById,
  getUsers,
  userStatus,
} from "../controllers/users.controller.ts";
import { authMiddleWare, isAdmin } from "../middlewares/auth.middleware.ts";

const router = Router();
router.get("/api/users", authMiddleWare, isAdmin, getUsers);
router.get("/api/users/:id", authMiddleWare, isAdmin, getUserById);
router.patch("/api/users/:id/status", authMiddleWare, isAdmin, userStatus);

export default router;
