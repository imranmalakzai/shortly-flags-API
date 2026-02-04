import express from "express";
import * as url from "./url.controller";
import softAuth from "../../middlewares/softAuth";
import * as schema from "./url.schema";
import validate from "../../middlewares/validate";
import auth from "../../middlewares/auth";
import { validRole } from "../../middlewares/validRole";

const urlRouter = express.Router();

urlRouter.route("/").post(softAuth, validate(schema.create), url.create);
urlRouter.route("/:shortCode").get(softAuth, url.oringalURL);
urlRouter.route("/urlId").delete(auth, validRole("admin"), url.deleteUrl);

export default url;
