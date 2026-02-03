import ApiError from "../../utils/apiError";
import * as db from "./url.repository";
import crypto from "crypto";
import { url } from "./url.type";

export const create = async (data: {
  user_id: number | null;
  original_url: string;
}) => {
  // in comming properties
  const original_url = data.original_url;
  const user_id = data.user_id;

  /**
   * Short.ly web site only store one short url per long url to save some disk storage
   * here We check if short url exist in db
   * 1 : if exist return that short url
   * 2 : if not exist generate new  shoret url, store it in db and send short url to the user
   */

  const url = await db.shortUrl(original_url);
  if (url) return url.short_code; // the bellow code is ignored if url exist

  const shortUrl = crypto.randomBytes(4).toString("hex");

  // short in db
  const result = await db.create({
    original_url,
    short_code: shortUrl,
    user_id: user_id || null,
  });

  if (result === 0) throw new ApiError("Internal servicer error", 500);
  return shortUrl;
};

export const originalUrl = async (url: string) => {
  const result = await db.originalUrl(url);
  if (!result) throw new ApiError("Invalid url", 400);
  return result.original_url;
};
