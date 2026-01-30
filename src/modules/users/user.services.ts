import ApiError from "../../utils/apiError";
import * as db from "./user.repository";
import bcrypt from "bcrypt";
import { person } from "./user.types";
import { accessToken, refreshToken } from "../../infra/jwt";
import { Users } from "./user.types";

export const register = async (data: person): Promise<number> => {
  // user already exist
  const user = await db.getUserByEmail(data.email);
  if (user) throw new ApiError("user already exist", 403);

  //hashPassword
  const password = await bcrypt.hash(data.password, 10);

  //result
  const result = await db.register({
    password,
    name: data.name,
    email: data.email,
  });
  return result;
};

export const login = async (data: { email: string; password: string }) => {
  //user exist
  const user = await db.getUserByEmail(data.email);
  if (!user) throw new ApiError("Invalid cridential", 403);

  //match password
  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) throw new ApiError("Invalid cridential", 403);

  // tokens
  const access_token = await accessToken(user);
  const refresh_oken = await refreshToken(user);

  //add redis later here!! to handle refreshToken
  return { user, access_token, refresh_oken };
};

export const users = async (): Promise<Users[]> => {
  const users = await db.users();
  return users;
};
