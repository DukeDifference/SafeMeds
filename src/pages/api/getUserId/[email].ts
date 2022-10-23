import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";

import getUserIdFromEmail from "../../../lib/utils/db/getUserIdFromEmail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new Client(process.env.DATABASE_URL);
  client.connect();

  const { email } = req.query;
  if (email === undefined) {
    res.status(400);
    return;
  }

  const cleanedEmail = Array.isArray(email) ? email[0] : email;
  const uuid = await getUserIdFromEmail(client, cleanedEmail);
  if (uuid === null) {
    // TODO: Redirect to login form
    res.status(500);
    return;
  }

  res.status(200);
  res.json(uuid);
}
