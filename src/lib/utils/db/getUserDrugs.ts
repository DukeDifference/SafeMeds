import type { Client } from "pg";

import type Uuid from "../../types/Uuid";

const getUserDrugs = async (client: Client, userId: Uuid) => {
  return (
    await client.query(
      `
  SELECT drug_id FROM user_drugs
  WHERE user_id = $1
  `,
      [userId.id]
    )
  ).rows;
};
export default getUserDrugs;
