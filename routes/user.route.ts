import { Router } from "express";
import { getUsers } from "../controllers/users.controller.ts";
import { authMiddleWare, isAdmin } from "../middlewares/auth.middleware.ts";

const router = Router();
router.get("/api/users", authMiddleWare, isAdmin, getUsers);

export default router;
