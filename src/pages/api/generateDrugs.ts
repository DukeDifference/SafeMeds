import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";

import generateRandomDrugs from "../../lib/utils/generation/generateRandomDrugs";

const generateDrugs = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = new Client(process.env.DATABASE_URL);
  await client.connect();

  try {
    const users = await generateRandomDrugs(client);
    res.statusCode = 200;
    res.json({ data: users });
  } catch (err) {
    res.statusCode = 500;
    res.json(err);
  } finally {
    client.end();
  }
};

export default generateDrugs;
