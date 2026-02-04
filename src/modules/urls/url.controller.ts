import asycHandler from "../../utils/asyncHandler";
import ApiError from "../../utils/apiError";
import * as services from "./url.service";
import { getRedis } from "../../infra/redis";
import * as urlClick from "../urlClick/urlClick.service";

//create short url
export const create = asycHandler(async (req, res) => {
  const original_url = req.body;

  // Get short url from services = db
  const shortCode = await services.create({
    user_id: req.user.id || null,
    original_url: original_url,
  });

  res.status(200).json({
    shortCode,
    shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}`,
  });
});

/**
 *  User type the short url on brower
 *  1: server resive the shortCode
 *  2: server check the redis cache first if original is missing
 *     (1): server fetch origin url from db if not exist throw new Api error
 *     (2): if exist set the url in redis cache for max time one day
 *     (3): redirct request to the original url
 *  3: if oringal url exist in cache redirect the request to the url
 */
export const oringalURL = asycHandler(async (req, res) => {
  const shortCode = req.params.shortCode;

  const redis = getRedis();

  // check redis
  const cachedUrl = await redis.get(`short_code:${shortCode}`);
  if (cachedUrl) return res.redirect(cachedUrl);

  const originalUrl = await services.originalUrl(shortCode);

  await redis.set(`short_code:${shortCode}`, originalUrl, { EX: 24 * 60 * 60 }); // 1 day

  //create log in background not using awit here
  const urlLog = urlClick.create({
    ip_address: req.ip,
    user_id: req.user.id || null,
    user_agent: req.headers["user-agent"],
  });
  res.redirect(originalUrl);
});

// Delete url (Admon only)
export const deleteUrl = asycHandler(async (req, res) => {
  const result = await services.remove(Number(req.params.urlId));
  if (result === 0) throw new ApiError("Internal server error", 500);
  return res.status(200).json({ message: "url delete successfully" });
});
