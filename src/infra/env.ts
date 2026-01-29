import env from "dotenv";

env.config({ path: ".env.production" });

export const { name } = process.env;
