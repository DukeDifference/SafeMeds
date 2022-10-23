/* eslint-disable @typescript-eslint/naming-convention */
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Client } from "pg";

import type Uuid from "lib/types/Uuid";
import getUser from "lib/utils/db/getUser";
import insertUserDrugPairToDb from "lib/utils/db/insertUserDrugPairtoDb";

const postUserDrug = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    const client = new Client(process.env.DATABASE_URL);
    client.connect();
    const { drug_id } = JSON.parse(req.body);
    if (session && session.user) {
      const { email } = session.user;
      if (typeof email === "string") {
        const user = await getUser(client, email);
        if (user !== null && user.id) {
          const userid: Uuid = {
            id: user.id,
          };
          const drugid: Uuid = {
            id: drug_id,
          };
          await insertUserDrugPairToDb(client, userid, drugid);
          return res.send({ status: true });
        }
      }
    }
    return res.send({ status: false });
  } catch (err) {
    return res.send({ status: false });
  }
};

export default postUserDrug;
