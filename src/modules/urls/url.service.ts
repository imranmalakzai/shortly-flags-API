import ApiError from "../../utils/apiError";
import * as db from "./url.repository";
import crypto from "crypto";
import { url } from "./url.type";

export const create = async (data: url) => {
  // in comming properties
  const original_url = data.original_url;
  const user_id = data.user_id;

  //genereate short url
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
