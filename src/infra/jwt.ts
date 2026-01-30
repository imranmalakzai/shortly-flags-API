import jwt from "jsonwebtoken";
import * as env from "../config/env";
import ApiError from "../utils/apiError";

// Generate Access Token
export const accessToken = async (user: {
  id: number;
  role: "owner" | "admin" | "user";
}) => {
  try {
    const token = await jwt.sign(
      { id: user.id, role: user.role },
      "dummy secret key",
      { expiresIn: "1h" },
    );
    return token;
  } catch (error) {
    throw new ApiError("unable to generate access token", 500);
  }
};
