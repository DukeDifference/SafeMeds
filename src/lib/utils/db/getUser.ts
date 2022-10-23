import type { Client } from "pg";

import type Email from "../../types/Email";
import type DbUser from "lib/types/DbUser";
import { toUser } from "lib/types/DbUser";
import type User from "lib/types/User";

const getUser = async (client: Client, email: Email): Promise<User | null> => {
  const dbUser = (
    await client.query(`SELECT * FROM users WHERE email = $1 LIMIT 1`, [email])
  ).rows as DbUser[];

  if (dbUser.length === 0) {
    return null;
  }
  return toUser(dbUser[0]);
};
export default getUser;
