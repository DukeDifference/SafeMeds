import type { Client } from "pg";

import type Drug from "../../types/Drug";

const getDrugFromRxcui = async (
  client: Client,
  rxcui: number
): Promise<Drug | null> => {
  const drug = (
    await client.query(
      `
    SELECT *
    FROM drugs
    WHERE rxcui = $1
    LIMIT 1;
  `,
      [rxcui]
    )
  ).rows as Drug[];
  if (drug.length === 0) {
    return null;
  }
  return drug[0];
};
export default getDrugFromRxcui;
