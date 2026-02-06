import express from "express";
import { connectRedis } from "./infra/redis";
import urlRouter from "./modules/urls/url.route";
import userRouter from "./modules/users/user.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/", urlRouter);
app.use("/api/", userRouter);

const startServer = async () => {
  await connectRedis();

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
};

startServer();
