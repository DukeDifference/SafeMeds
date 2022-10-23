import type { Client } from "pg";

import type DbDrug from "../../types/DbDrug";
import { toDrug } from "../../types/DbDrug";

const insertDrugToDb = async (client: Client, rxcui: number, name: string) => {
  const dbDrug = (
    await client.query(
      `INSERT INTO public.drugs
        (rxcui, name)
        VALUES ($1, $2) RETURNING id, rxcui, name`,
      [rxcui, name.toLowerCase()]
    )
  ).rows[0] as DbDrug;
  return toDrug(dbDrug);
};

export default insertDrugToDb;
