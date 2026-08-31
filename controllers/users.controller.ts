import type { Request, Response } from "express";
import getErrorMessage from "../utils/getErrorMessage.ts";
import User from "../models/user.model.ts";
import type { AuthenticatedRequest } from "../utils/authenticatedRequest.ts";
import bcrypt from "bcrypt";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.status(200).json({
      message: "users data retrieved",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      data: getErrorMessage(error),
    });
  }
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const userID = req.params.id;
    const findUser = await User.findByPk(userID, {
      attributes: { exclude: ["password"] },
    });

    if (!findUser) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    res.status(200).json({
      message: "user found",
      data: findUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      data: getErrorMessage(error),
    });
  }
};

export const userStatus = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const userID = parseInt(req.params.id);
    const status = req.body;

    if (!userID) {
      return res.status(404).json({
        message: "invalid user id provided",
      });
    }

    if (status.isActive != true && status.isActive != false) {
      return res.status(400).json({
        message: "invalid status provided",
      });
    }

    const [affectedRows] = await User.update(status, { where: { id: userID } });
    if (affectedRows === 0) {
      return res.status(404).json({
        message: "no user found with the given id",
      });
    }

    const updated = await User.findByPk(userID);
    res.status(200).json({
      message: "user status updated",
      data: {
        id: updated?.id,
        firstName: updated?.firstName,
        lastName: updated?.lastName,
        email: updated?.email,
        isActive: updated?.isActive,
        role: updated?.role,
        createdAt: updated?.createdAt,
        updatedAt: updated?.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      data: getErrorMessage(error),
    });
  }
};

export const ownProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userID =
      typeof req.user === "object" && req.user != null
        ? req.user.id
        : undefined;

    const findUser = await User.findByPk(userID, {
      attributes: { exclude: ["password"] },
    });
    if (!findUser) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    res.status(200).json({
      data: findUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      data: getErrorMessage(error),
    });
  }
};

export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    let { firstName, lastName } = req.body;

    const userID =
      typeof req.user === "object" && req.user != null
        ? req.user.id
        : undefined;

    const findUser = await User.findByPk(userID);
    if (!findUser) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    if (!firstName) {
      firstName = findUser.firstName;
    }

    if (!lastName) {
      lastName = findUser.lastName;
    }

    findUser.firstName = firstName;
    findUser.lastName = lastName;
    await findUser.save();

    res.status(200).json({
      message: "user updated successfully",
      data: {
        id: findUser.id,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        email: findUser.email,
        isActive: findUser.isActive,
        role: findUser.role,
        createdAt: findUser.createdAt,
        updatedAt: findUser.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      data: getErrorMessage(error),
    });
  }
};
