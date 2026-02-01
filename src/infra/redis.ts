import { createClient, RedisClientType } from "redis";
import { REDIS_SERVER_URL } from "../config/env";

let redis: RedisClientType;

export const connectRedis = async () => {
  redis = createClient({
    url: REDIS_SERVER_URL,
  });

  redis.on("connect", () => {
    console.log("✅ Redis connected");
  });

  redis.on("error", (err) => {
    console.error("❌ Redis error:", err);
  });

  await redis.connect();
};

export const getRedis = (): RedisClientType => {
  if (!redis) {
    throw new Error("Redis not connected");
  }
  return redis;
};
