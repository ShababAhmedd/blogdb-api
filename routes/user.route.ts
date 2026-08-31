import { Router } from "express";
import { getUserById, getUsers } from "../controllers/users.controller.ts";
import { authMiddleWare, isAdmin } from "../middlewares/auth.middleware.ts";

const router = Router();
router.get("/api/users", authMiddleWare, isAdmin, getUsers);
router.get("/api/users/:id", authMiddleWare, isAdmin, getUserById);

export default router;
