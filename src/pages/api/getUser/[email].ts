import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";

import getUser from "../../../lib/utils/db/getUser";

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

  const user = await getUser(client, cleanedEmail);
  if (user === null) {
    // TODO: Redirect to login form
    res.status(200);
    res.send({ status: false, data: null });
    return;
  }

  res.status(200);
  res.send({ status: true, data: user });
}
