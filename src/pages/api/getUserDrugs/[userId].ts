import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";

import getUserDrugs from "../../../lib/utils/db/getUserDrugs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new Client(process.env.DATABASE_URL);
  client.connect();

  const { userId } = req.query;
  if (userId === undefined) {
    res.end({ status: false, data: null });
  } else {
    const typedUserId = Array.isArray(userId)
      ? { id: userId[0] }
      : { id: userId };
    const userDrugs = await getUserDrugs(client, typedUserId);
    res.status(200);
    res.json({ status: true, data: userDrugs });
  }
}
