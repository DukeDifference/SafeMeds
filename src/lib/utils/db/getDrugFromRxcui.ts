import type { Client } from "pg";

import type Drug from "../../types/Drug";

const getDrugFromRxcui = async (
  client: Client,
  rxcui: number
): Promise<Drug | null> => {
  const drug = (
    await client.query(
      `
    SELECT 1
    FROM table_name
    WHERE rxcui = rxcui
    VALUES($1)
    RETURNS (id, rxcui, name);
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
