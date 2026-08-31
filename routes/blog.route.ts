import { Router } from "express";
import { createBlog, updateBlog } from "../controllers/blog.controller.ts";
import { authMiddleWare } from "../middlewares/auth.middleware.ts";
import { canModifyBlog } from "../middlewares/blog.middleware.ts";

const router = Router();
router.post("/api/blogs/create", authMiddleWare, createBlog);
router.put("/api/blogs/update/:id", authMiddleWare, canModifyBlog, updateBlog);

export default router;
