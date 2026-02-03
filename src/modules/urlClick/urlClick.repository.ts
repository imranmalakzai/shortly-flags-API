import { pool } from "../../infra/mysql";
import { ResultSetHeader } from "mysql2";
import { urlClick } from "./urlClick.type";

//store the urlClick log in db
export const create = async (data: urlClick) => {
  const [result] = await pool.query<ResultSetHeader>(
    "INTERT INTO url_clicks (url_id,user_id,ip_address,user_agent) VALUES (?,?,?,?)",
    [data.url_id, data.user_id, data.user_agent, data.ip_address],
  );
  result.insertId;
};
