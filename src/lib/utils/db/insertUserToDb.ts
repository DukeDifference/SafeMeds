import type { Client } from "pg";

import type User from "../../types/User";
import { toUser } from "lib/types/DbUser";

const insertUserToDb = async (client: Client, user: User) => {
  const dbUser = (
    await client.query(
      `INSERT INTO public.users
        (first_name, last_name, sex, date_of_birth, email, consumes_alcohol, consumes_caffeine, consumes_nicotine)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        user.firstName,
        user.lastName,
        user.sex,
        user.dateOfBirth,
        user.email,
        user.consumesAlcohol,
        user.consumesCaffeine,
        user.consumesNicotine,
      ]
    )
  ).rows[0];
  return toUser(dbUser);
};

export default insertUserToDb;
