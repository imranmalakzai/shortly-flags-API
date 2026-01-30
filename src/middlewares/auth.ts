import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import * as env from "../config/env";
import ApiError from "../utils/apiError";

interface AuthPayload extends JwtPayload {
  id: number;
  role: "admin" | "user" | "owner";
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer")) {
      throw new ApiError("please authenticate", 401);
    }
    const token = header.split(" ")[1];
    const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET!) as AuthPayload;

    req.user = payload;
    next();
  } catch (error) {
    throw new ApiError("Invalid token or token is expired", 401);
  }
};

export default auth;
