import { ZodError } from "zod";
import ApiError from "../utils/apiError";

export const zodErrorHandler = (error: ZodError) => {
  const issue = error.issues[0];
  const message = issue.message;
  return new ApiError(message, 400);
};
