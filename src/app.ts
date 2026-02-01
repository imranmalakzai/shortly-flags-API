import express from "express";
import { connectRedis } from "./infra/redis";

const app = express();

const startServer = async () => {
  await connectRedis();

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
};

startServer();
