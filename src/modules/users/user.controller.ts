import asycHandler from "../../utils/asyncHandler";
import * as services from "./user.services";
import ApiError from "../../utils/apiError";

// Regiser new user
export const register = asycHandler(async (req, res) => {
  const user = await services.register(req.body);
  if (user === 0) throw new ApiError("Internal server error", 500);
  res.status(200).json({ message: "user registered successfully" });
});
