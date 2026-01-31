import { ZodError } from "zod";
import { zodErrorHandler } from "../infra/zod";
import ApiError from "../utils/apiError";
import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // if error belongs to our api error class
    if (err instanceof ApiError) {
      return res
        .status(err.statusCode)
        .json({ message: err.message, success: err.success });
    }

    // if err belongs to Error class
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message, success: false });
    }

    if (err instanceof ZodError) {
      const apiError = zodErrorHandler(err);
      return res
        .status(apiError.statusCode)
        .json({ message: apiError.message, success: apiError.success });
    }

    //unspected error
    res.status(500).json({ success: false, message: "Internal server error" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Critical error in error handler",
      error,
    });
  }
};

export default errorHandler;
