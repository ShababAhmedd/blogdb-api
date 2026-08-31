import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../utils/authenticatedRequest.ts";
import getErrorMessage from "../utils/getErrorMessage.ts";
import Blog from "../models/blog.model.ts";

export const createBlog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { blogTitle, blog, category } = req.body;
    if (!blogTitle || !blog || !category) {
      return res.status(400).json({
        message: "all fields must be filled.",
      });
    }

    const userId =
      typeof req.user === "object" && req.user != null
        ? req.user.id
        : undefined;

    const newBlog = await Blog.create({
      userId: userId,
      blogTitle,
      blog,
      category,
    });

    res.status(201).json({
      message: "blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      data: getErrorMessage(error),
    });
  }
};

export const updateBlog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    let { blogTitle, blog, category } = req.body;

    if (!blogTitle && !blog && !category) {
      return res.status(400).json({
        message: "invalid input",
      });
    }

    if (!blogTitle) blogTitle = req.blog!.blogTitle;
    if (!blog) blog = req.blog!.blog;
    if (!category) category = req.blog!.category;

    req.blog!.blogTitle = blogTitle;
    req.blog!.blog = blog;
    req.blog!.category = category;
    await req.blog!.save();

    res.status(200).json({
      message: "blog updated successfully",
      data: req.blog,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
      data: getErrorMessage(error),
    });
  }
};
