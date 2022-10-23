import type { Client } from "pg";

import type Uuid from "../../types/Uuid";

const getUserDrugs = async (client: Client, userId: Uuid) => {
  return (
    await client.query(
      `
    SELECT *
    FROM (
        SELECT DISTINCT drug_id,
            user_id
        FROM user_drugs
    )
    INNER JOIN drugs ON drug_id = drugs.id
    AND user_id = $1;
  `,
      [userId.id]
    )
  ).rows;
};
export default getUserDrugs;
