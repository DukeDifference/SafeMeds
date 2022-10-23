import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";

import generateRandomUsers from "../../lib/utils/generation/generateRandomUsers";

const generateUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = new Client(process.env.DATABASE_URL);
  await client.connect();

  try {
    const users = await generateRandomUsers(client);
    res.statusCode = 200;
    res.json({ data: users });
  } catch (err) {
    res.statusCode = 500;
    res.json(err);
  } finally {
    client.end();
  }
};

export default generateUsers;
