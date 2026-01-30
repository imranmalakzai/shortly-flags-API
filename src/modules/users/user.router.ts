import express from "express";
import auth from "../../middlewares/auth";
import * as users from "./user.controller";

const userRouter = express.Router();

userRouter.route("/auth/register").post(users.register);
userRouter.route("/auth/login").post(auth, users.login);

userRouter.route("/users/me/password").patch(auth, users.password);
