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

// Get all users
export const users = asycHandler(async (req, res) => {
  const users = await services.users();
  res.status(200).json({ users });
});

// Get a user by id
export const user = asycHandler(async (req, res) => {
  const user = await services.user(req.body);
  res.status(200).json({ user });
});

// update user password
export const password = asycHandler(async (req, res) => {
  const { newPassword, oldPassword } = req.body;
  const result = await services.password(req.user.id, newPassword, oldPassword);
  if (result === 0) throw new ApiError("Internal server error", 500);
  res.status(200).json({ message: "password updated successfully" });
});

// delete account
export const remove = asycHandler(async (req, res) => {
  const result = await services.remove(req.user.id);
  if (result === 0) throw new ApiError("Internal server error", 500);
  res.status(200).json({ message: "Account deleted successfully" });
});

// my profile
export const me = asycHandler(async (req, res) => {
  const me = await services.user(req.user.id);
  if (!me) throw new ApiError("user not exist", 404);
  res.status(200).json({ user: me });
});
