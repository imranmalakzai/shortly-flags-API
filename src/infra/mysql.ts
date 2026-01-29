import mysql from "mysql2/promise";
import * as env from "../config/env";

export const pool = mysql.createPool({
  host: env.HOST,
  user: env.USER,
  password: env.PASSWORD,
  database: env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
