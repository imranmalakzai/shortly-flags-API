import { RowDataPacket } from "mysql2";
export interface url extends RowDataPacket {
  user_id?: number;
  original_url: string;
  short_code?: string;
}
