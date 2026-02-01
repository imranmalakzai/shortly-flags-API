import jwt from "jsonwebtoken";
import * as env from "../../config/env";
import ApiError from "../../utils/apiError";
import * as db from "./user.repository";
import bcrypt from "bcrypt";
import { person } from "./user.types";
import { accessToken, refreshToken } from "../../infra/jwt";
import { Users } from "./user.types";
import { getRedis } from "../../infra/redis";

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
  const redis = getRedis();

  const Max_attempts = 5;
  const Lock_time = 15 * 60;
  const key = `Login_attempt:${data.email}`;

  //check for attempt >= 5
  const attempts = await redis.get(key);
  if (attempts && Number(attempts) >= Max_attempts) {
    throw new ApiError(
      "Too many loggin attempts!,please try again later.",
      429,
    );
  }

  const user = await db.getUserByEmail(data.email);
  if (!user) throw new ApiError("Invalid cridential", 403);

  //match password
  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    await redis.incr(key);
    await redis.expire(key, Lock_time);
    throw new ApiError("Invalid cridential", 403);
  }

  //delete redis key
  await redis.del(key);

  // tokens
  const access_token = await accessToken(user);
  const refresh_oken = await refreshToken(user);

  // add redis refresh token
  await redis.set(`user:${user.id}:refreshToken`, refresh_oken, {
    EX: 7 * 24 * 60 * 60,
  });

  return { user, access_token, refresh_oken };
};

export const users = async (): Promise<Users[]> => {
  const users = await db.users();
  return users;
};

export const user = async (userId: number): Promise<Users> => {
  const user = await db.user(userId);
  return user;
};

export const password = async (
  userId: number,
  newpassword: string,
  oldPassword: string,
): Promise<number> => {
  const user = await db.user(userId);

  //compare password
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new ApiError("Invalid old password", 400);

  //result
  const result = await db.password(newpassword, userId);
  return result;
};

export const remove = async (userId: number): Promise<number> => {
  const result = await db.remove(userId);
  return result;
};

export const updateRole = async (
  userId: number,
  role: "user" | "admin" | "owner",
) => {
  const result = await db.updateuserRole(role, userId);
  return result;
};

export const validateToken = async (refreshToken: string) => {
  const redis = getRedis();

  if (!refreshToken) throw new ApiError("refreshToken not exist", 404);

  const payload = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET!) as {
    id: number;
    role: "admin" | "user" | "owner";
  };

  // stored token
  const storedToken = await redis.get(`user:${payload.id!}:refreshToken`);
  if (!storedToken || storedToken !== refreshToken) {
    throw new ApiError("Invalid refresh token", 403);
  }

  const access_token = await accessToken(payload);

  return access_token;
};

export const logout = async (userId: number) => {
  //get redis connection
  const redis = getRedis();
  await redis.del(`user:${userId}:refreshToken`);
  return true;
};
