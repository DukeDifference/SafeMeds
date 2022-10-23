import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";

import generateRandomUserDrugPairs from "lib/utils/generation/generateRandomUserDrugPairs";

const generateUserDrugs = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = new Client(process.env.DATABASE_URL);
  await client.connect();

  try {
    const userDrugs = await generateRandomUserDrugPairs(client);
    res.statusCode = 200;
    res.json({ data: userDrugs });
  } catch (err) {
    res.statusCode = 500;
    res.json(err);
  } finally {
    client.end();
  }
};

export default generateUserDrugs;
