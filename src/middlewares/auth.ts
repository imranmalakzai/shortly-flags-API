import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as env from "../config/env";
import ApiError from "../utils/apiError";

const auth = async (req: Request, res: Response) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer")) {
      throw new ApiError("please authenticate", 401);
    }
    const token = await header.split(" ")[1];
    const user = await jwt.verify(token, env.ACCESS_TOKEN_SECRET!);
    return user;
  } catch (error) {
    throw new ApiError("Invalid token or token is expired", 401);
  }
};

export default auth;
