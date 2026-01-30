import asycHandler from "../../utils/asyncHandler";
import * as services from "./user.services";
import ApiError from "../../utils/apiError";

// Regiser new user
export const register = asycHandler(async (req, res) => {
  const user = await services.register(req.body);
  if (user === 0) throw new ApiError("Internal server error", 500);
  res.status(200).json({ message: "user registered successfully" });
});

// Login as existing account
export const login = asycHandler(async (req, res) => {
  const { user, access_token, refresh_oken } = await services.login(req.body);
  res.status(200).json({
    accessToken: access_token,
    user: { id: user.id, email: user.email, role: user.role },
  });
});

//get all users
export const users = asycHandler(async (req, res) => {
  const users = await services.users();
  res.status(200).json({ users });
});
