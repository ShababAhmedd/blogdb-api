import { Router } from "express";
import {
  getUserById,
  getUsers,
  updateProfile,
  userStatus,
} from "../controllers/users.controller.ts";
import { authMiddleWare, isAdmin } from "../middlewares/auth.middleware.ts";

const router = Router();
router.get("/api/users", authMiddleWare, isAdmin, getUsers);
router.get("/api/users/:id", authMiddleWare, isAdmin, getUserById);
router.patch("/api/users/:id/status", authMiddleWare, isAdmin, userStatus);
router.put("/api/users/profile/update", authMiddleWare, updateProfile);

export default router;
