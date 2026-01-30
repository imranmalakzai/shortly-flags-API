import { RowDataPacket } from "mysql2";
//user preference
export interface person {
  name: string;
  email: string;
  password: string;
}

//change user password
export interface password {
  id: number;
  password: string;
}

//Get all users Interface
export interface Users extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "owner" | "user";
}
