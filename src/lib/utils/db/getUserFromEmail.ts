import { Client } from "pg";

import getUser from "./getUser";

export default async function getUserFromEmail(email: string) {
  const client = new Client(process.env.DATABASE_URL);
  client.connect();
  const cleanedEmail = Array.isArray(email) ? email[0] : email;
  return getUser(client, cleanedEmail);
}
