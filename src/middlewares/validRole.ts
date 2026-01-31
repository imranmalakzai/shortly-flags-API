import ApiError from "../utils/apiError";
import { Request, Response, NextFunction } from "express";

export const validRole = (...role: ("admin" | "user" | "owner")[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw new ApiError("user not found", 404);
      if (!role.includes(req.user.role)) {
        throw new ApiError("Access denied", 403);
      }
      next();
    } catch (error) {
      throw new ApiError("critical error inside validRole middleware", 500);
    }
  };
};
