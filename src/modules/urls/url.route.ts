import express from "express";
import * as url from "./url.controller";
import softAuth from "../../middlewares/softAuth";
import * as schema from "./url.schema";
import validate from "../../middlewares/validate";

const urlRouter = express.Router();

urlRouter.route("/").post(softAuth, validate(schema.create), url.create);
urlRouter.route("/:shortCode").get(softAuth, url.oringalURL);

export default urlRouter;
