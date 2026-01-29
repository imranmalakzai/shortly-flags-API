import env from "dotenv";

env.config({ path: ".env.production" });

export const {
  HOST,
  USER,
  PASSWORD,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  CORS_ORIGIN,
  REDIS_SERVER_URL,
} = process.env;
