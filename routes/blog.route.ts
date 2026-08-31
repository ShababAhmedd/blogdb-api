import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blog.controller.ts";
import { authMiddleWare } from "../middlewares/auth.middleware.ts";
import { canModifyBlog } from "../middlewares/blog.middleware.ts";

const router = Router();
router.post("/api/blogs/create", authMiddleWare, createBlog);
router.put("/api/blogs/update/:id", authMiddleWare, canModifyBlog, updateBlog);
router.delete("/api/blogs/:id", authMiddleWare, canModifyBlog, deleteBlog);

export default router;
