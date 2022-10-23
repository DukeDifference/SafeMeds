import type { Client } from "pg";

import type Email from "../../types/Email";
import type Uuid from "lib/types/Uuid";

const getUserIdFromEmail = async (
  client: Client,
  email: Email
): Promise<Uuid | null> => {
  const uuid = (
    await client.query(`SELECT id FROM users WHERE email = $1 LIMIT 1`, [email])
  ).rows as Uuid[];

  if (uuid.length === 0) {
    return null;
  }
  return uuid[0];
};
export default getUserIdFromEmail;
