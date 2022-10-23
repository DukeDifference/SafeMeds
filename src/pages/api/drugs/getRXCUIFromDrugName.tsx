import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";

import getDrugFromRxcui from "../../../lib/utils/db/getDrugFromRxcui";
import insertDrugToDb from "../../../lib/utils/db/insertDrugToDb";

const getRXCUIFromDrugName = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { name } = JSON.parse(req.body);
  const ENDPOINT = "https://rxnav.nlm.nih.gov/REST/rxcui.json";
  const resp = (await axios.get(`${ENDPOINT}?name=${name}&search=2`)).data;

  if (Object.keys(resp.idGroup).length !== 0) {
    const rxcui = resp.idGroup.rxnormId[0];

    const client = new Client(process.env.DATABASE_URL);
    client.connect();
    let drug = await getDrugFromRxcui(client, rxcui);
    if (drug === null) {
      drug = await insertDrugToDb(client, rxcui, name);
    }
    client.end();

    res.send({
      success: true,
      data: rxcui,
      drug: drug?.id,
    });
  }
  res.send({
    success: false,
    data: 0,
    drug: 0,
  });
};

export default getRXCUIFromDrugName;
