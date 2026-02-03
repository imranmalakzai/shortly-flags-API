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

  res
    .status(200)
    .json({
      shortCode,
      shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}`,
    });
});
