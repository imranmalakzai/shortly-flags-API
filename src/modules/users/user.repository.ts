import { pool } from "../../infra/mysql";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { person, password as ps, Users } from "./user.types";

// Register a new user
export const register = async (user: person): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO users (name,email,password) VALUES (?,?,?)",
    [user.name, user.email, user.password],
  );
  return result.insertId || 0;
};

//update password
export const password = async (data: ps): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    "UPDATE users SET password = ? WHERE id = ?",
    [data.id, data.password],
  );
  return result.insertId;
};

export const users = async (): Promise<Users[]> => {
  const [rows] = await pool.query<Users[] & ResultSetHeader>(
    "SELECT id,name,email FROM users",
  );
  return rows;
};
