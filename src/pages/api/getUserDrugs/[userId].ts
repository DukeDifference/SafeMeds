import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";

import getUserDrugs from "../../../lib/utils/db/getUserDrugs";
import type Uuid from "lib/types/Uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = new Client(process.env.DATABASE_URL);
  client.connect();
  const defaultUserId = (await client.query("SELECT id FROM users LIMIT 1;"))
    .rows[0] as Uuid;

  let { userId } = req.query;
  if (userId === undefined) {
    userId = defaultUserId.id;
  }

  const typedUserId = Array.isArray(userId)
    ? { id: userId[0] }
    : { id: userId };
  const userDrugs = (await getUserDrugs(client, typedUserId)).map(
    (obj) => obj.drug_id
  );
  res.status(200);
  res.json(userDrugs);
}
