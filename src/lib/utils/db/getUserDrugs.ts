import type { Client } from "pg";

import type Uuid from "../../types/Uuid";

const getUserDrugs = async (client: Client, userId: Uuid) => {
  return (
    await client.query(
      `
  SELECT * FROM user_drugs
  WHERE user_id = $1
  INNER JOIN drugs
  ON drug_id = drugs.id;
  `,
      [userId.id]
    )
  ).rows;
};
export default getUserDrugs;
