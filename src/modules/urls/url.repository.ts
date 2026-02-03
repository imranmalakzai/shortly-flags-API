import { pool } from "../../infra/mysql";
import { ResultSetHeader } from "mysql2";
import { url } from "./url.type";

// Add long and short url of a user
export const create = async (data: {
  user_id?: number | null;
  original_url: string;
  short_code: string;
}) => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO urls (user_id,original_url,short_code) VALUES (?,?,?)",
    [data.user_id || null, data.original_url, data.short_code],
  );
  return result.insertId;
};

//** Get short url by origin url */
export const shortUrl = async (original_url: string) => {
  const [rows] = await pool.query<url[]>(
    "SELECT * FROM users WHERE original_url = ?",
    [original_url],
  );
  return rows[0];
};

//** Get oringial url by short url */
export const originalUrl = async (shortCode: string) => {
  const [rows] = await pool.query<url[]>(
    "SELECT * FROM urls WHERE short_code = ?",
    [shortCode],
  );
  return rows[0];
};
