import { Router } from "express";
import { createBlog } from "../controllers/blog.controller.ts";
import { authMiddleWare } from "../middlewares/auth.middleware.ts";

const router = Router();
router.post("/api/blogs/create", authMiddleWare, createBlog);

export default router;
