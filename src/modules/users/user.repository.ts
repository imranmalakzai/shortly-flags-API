import { pool } from "../../infra/mysql";
import { ResultSetHeader } from "mysql2";
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

// fetch all users
export const users = async (): Promise<Users[]> => {
  const [rows] = await pool.query<Users[]>("SELECT id,email,name FROM users");
  return rows;
};

//Get a user by Id
export const user = async (userId: number): Promise<Users> => {
  const [rows] = await pool.query<Users[]>("SELECT * FROM users WHERE id = ", [
    userId,
  ]);
  return rows[0];
};

// Delete a user
export const remove = async (userId: number): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    "DELETE FROM users WHERE id = ?",
    userId,
  );
  return result.insertId;
};
