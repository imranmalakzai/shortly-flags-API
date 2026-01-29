import { pool } from "../../infra/mysql";
import { ResultSetHeader } from "mysql2";

//user preference
interface person {
  name: string;
  email: string;
  password: string;
}

// Register a new user
export const register = async (user: person): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO users (name,email,password) VALUES (?,?,?)",
    [user.name, user.email, user.password],
  );
  return result.insertId || 0;
};
