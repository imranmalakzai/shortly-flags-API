import jwt from "jsonwebtoken";
import * as env from "../config/env";
import type { StringValue } from "ms";
import ApiError from "../utils/apiError";

// Generate Access Token
export const accessToken = async (user: {
  id: number;
  role: "owner" | "admin" | "user";
}) => {
  try {
    const token = await jwt.sign(
      { id: user.id, role: user.role },
      env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: env.ACCESS_TOKEN_EXPIRY as StringValue,
      },
    );
    return token;
  } catch (error) {
    throw new ApiError("unable to generate access token", 500);
  }
};

// Generate Refresh Token
export const refreshToken = async (user: {
  id: number;
  role: "owner" | "admin" | "user";
}) => {
  try {
    const token = await jwt.sign(
      { id: user.id, role: user.role },
      env.REFRESH_TOKEN_SECRET!,
      { expiresIn: env.REFRESH_TOKEN_EXPIRY as StringValue },
    );
    return token;
  } catch (error) {
    throw new ApiError("unable to generate refresh token", 500);
  }
};
