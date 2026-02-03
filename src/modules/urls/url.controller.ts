import asycHandler from "../../utils/asyncHandler";
import ApiError from "../../utils/apiError";
import * as services from "./url.service";
import { getRedis } from "../../infra/redis";

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
 *  2: server check for the url in db if exist return the redirect the user to the oringal url
 */
export const oringalUrl = asycHandler(async (req, res) => {
  const shortCode = req.params.shortCode;
  const originalUrl = await services.originalUrl(shortCode);
  res.redirect(originalUrl);
});
