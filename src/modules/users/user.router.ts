import express from "express";
import auth from "../../middlewares/auth";
import * as users from "./user.controller";
import { validRole } from "../../middlewares/validRole";

const userRouter = express.Router();

userRouter.route("/auth/register").post(users.register);
userRouter.route("/auth/login").post(auth, users.login);

userRouter.route("/users").get(auth, users.users);
userRouter.route("/users/:userId").get(users.user);

userRouter.route("/users/me").get(auth, users.me);
userRouter.route("/users/me").delete(auth, users.remove);
userRouter.route("/users/me/password").patch(auth, users.password);

userRouter
  .route("/admin/users/:userId")
  .patch(auth, validRole("owner"), users.updateRole);

userRouter
  .route("/admin/users/:userId")
  .delete(auth, validRole("owner", "admin"), users.deleteUser);
