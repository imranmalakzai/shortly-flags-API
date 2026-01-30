import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user: { id: number; role: "admin" | "owner" | "user" };
    }
  }
}

export {};
