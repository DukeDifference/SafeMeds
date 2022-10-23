import type { Client } from "pg";

import type User from "../../types/User";

const insertUserToDb = async (client: Client, user: User) => {
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
  );
};

export default insertUserToDb;
