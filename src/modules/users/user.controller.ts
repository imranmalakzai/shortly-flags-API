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
  const result = await services.login(req.body);
  res.status(200).json({
    accessToken: result.access_token,
    user: {
      id: result.user.id,
      email: result.user.email,
      role: result.user.role,
    },
  });
});

// Get all users
export const users = asycHandler(async (req, res) => {
  const users = await services.users();
  res.status(200).json({ users });
});

// Get a user by id
export const user = asycHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await services.user(Number(userId));
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

// update user role
export const updateRole = asycHandler(async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  //result
  const result = await services.updateRole(Number(userId), role);
  if (result === 0) throw new ApiError("Internal server error", 500);

  res.status(200).json({ message: "user role updated successfully" });
});

// delete user account
export const deleteUser = asycHandler(async (req, res) => {
  const result = await services.remove(Number(req.params.userId));
  if (result === 0) throw new ApiError("Internal server error", 500);
  res.status(200).json({ message: "Account deleted successfully" });
});

// refresh access token
export const refreshToken = asycHandler(async (req, res) => {
  const accessToken = await services.validateToken(req.body);
  if (!accessToken) throw new ApiError("Internal server error", 500);

  res.status(200).json({ accessToken });
});
