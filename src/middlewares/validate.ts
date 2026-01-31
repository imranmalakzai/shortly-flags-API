import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  };

export default validate;
