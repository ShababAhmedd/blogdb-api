import { Router } from "express";
import { login, signUp } from "../controllers/auth.controller.ts";
// import { authMiddleWare } from "../middlewares/auth.middleware.ts";
// import { ownProfile } from "../controllers/users.controller.ts";

const router = Router();
router.post("/api/auth/login", login);
router.post("/api/auth/register", signUp);
// router.get("/api/users/profile", authMiddleWare, ownProfile);
export default router;
