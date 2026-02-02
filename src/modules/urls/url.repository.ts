import { pool } from "../../infra/mysql";
import { ResultSetHeader } from "mysql2";
import { url } from "./url.type";

// Add long and short url of a user
export const create = async (data: url) => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO urls (user_id,original_url,short_code) VALUES (?,?,?)",
    [data.user_id || null, data.original_url, data.short_code],
  );
  return result.insertId;
};
