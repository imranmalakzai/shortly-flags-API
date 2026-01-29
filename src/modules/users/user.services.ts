import ApiError from "../../utils/apiError";
import * as db from "./user.repository";
import bcrypt from "bcrypt";

import { person } from "./user.types";

export const register = async (data: person): Promise<number> => {
  // user already exist
  const user = await db.getUserByEmail(data.email);
  if (user) throw new ApiError("user already exist", 403);

  //hashPassword
  const password = await bcrypt.hash(data.password, 10);

  //result
  const result = await db.register({
    password,
    name: data.name,
    email: data.email,
  });
  return result;
};
