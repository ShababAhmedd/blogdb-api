import { Router } from "express";
import { login, signUp } from "../controllers/auth.controller.ts";
import {} from "../middlewares/auth.middleware.ts";

const router = Router();
router.post("/api/auth/login", login);
router.post("/api/auth/register", signUp);

export default router;
