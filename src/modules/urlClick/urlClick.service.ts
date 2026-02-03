import * as db from "./urlClick.repository";
import ApiError from "../../utils/apiError";
import { urlClick } from "./urlClick.type";

// create log
export const create = async (data: any) => {
  const result = await db.create(data);
};
