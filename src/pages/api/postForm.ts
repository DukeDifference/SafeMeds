/* eslint-disable @typescript-eslint/naming-convention */
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Client } from "pg";

import type User from "../../lib/types/User";
import insertUserToDb from "../../lib/utils/db/insertUserToDb";

export default async function postForm(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const body = JSON.parse(req.body);
    const client = new Client(process.env.DATABASE_URL);
    const session = await getSession({ req });
    client.connect();
    const split_names = session?.user?.name;
    const email = session?.user?.email;
    if (email === undefined || email === null) {
      throw Error("this should never be thrown");
    }
    const user: User = {
      firstName: split_names || "JohnDoe",
      lastName: "does not work",
      sex: body.sex,
      dateOfBirth: body.dob,
      email,
      consumesAlcohol: body.alcohol,
      consumesCaffeine: body.caffiene,
      consumesNicotine: body.alcohol,
    };
    await insertUserToDb(client, user);
    res.send({ status: true });
  } catch (err) {
    res.send({ status: false });
  }
}
