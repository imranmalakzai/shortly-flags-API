import express from "express";
import * as url from "./url.controller";
import auth from "../../middlewares/auth";
import * as schema from "./url.schema";
import validate from "../../middlewares/validate";

const urlRouter = express.Router();

urlRouter.route("/").post(auth, validate(schema.create), url.create);
urlRouter.route("/:shortCode").get(auth, url.oringalUrl);

export default urlRouter;
