import type { Client } from "pg";

import type DbDrug from "../../types/DbDrug";
import { toDrug } from "../../types/DbDrug";
import type Drug from "../../types/Drug";

const getDrugFromRxcui = async (
  client: Client,
  rxcui: number
): Promise<Drug | null> => {
  const dbDrug = (
    await client.query(
      `
    SELECT *
    FROM drugs
    WHERE rxcui = $1
    LIMIT 1;
  `,
      [rxcui]
    )
  ).rows as DbDrug[];
  if (dbDrug.length === 0) {
    return null;
  }
  return toDrug(dbDrug[0]);
};
export default getDrugFromRxcui;
