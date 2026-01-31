import express from "express";
import auth from "../../middlewares/auth";
import * as users from "./user.controller";
import { validRole } from "../../middlewares/validRole";
import * as schema from "./user.schema";
import validate from "../../middlewares/validate";

const userRouter = express.Router();

//register
userRouter
  .route("/auth/register")
  .post(validate(schema.register), users.register);

// login
userRouter.route("/auth/login").post(validate(schema.login), users.login);

// fetch all users
userRouter.route("/users").get(auth, users.users);

// fetch a user by userId
userRouter.route("/users/:userId").get(users.user);

// get currect logged profile
userRouter.route("/users/me").get(auth, users.me);

// delete current account
userRouter.route("/users/me").delete(auth, users.remove);

// update password
userRouter
  .route("/users/me/password")
  .patch(auth, validate(schema.password), users.password);

// delete user account
userRouter
  .route("/admin/users/:userId")
  .patch(auth, validRole("owner"), users.updateRole);

// update user role
userRouter
  .route("/admin/users/:userId")
  .delete(auth, validRole("owner", "admin"), users.deleteUser);
