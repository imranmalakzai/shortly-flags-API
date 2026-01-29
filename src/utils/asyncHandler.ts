import { Request, Response, RequestHandler, NextFunction } from "express";

const asycHandler = (fn: RequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await fn(req, res, next);
    try {
    } catch (error) {
      next(error);
    }
  };
};

export default asycHandler;
