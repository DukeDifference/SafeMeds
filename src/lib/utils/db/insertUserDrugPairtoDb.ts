import type { Client } from "pg";

import type Uuid from "../../types/Uuid";

const insertUserDrugPairToDb = async (
  client: Client,
  userId: Uuid,
  drugId: Uuid
) => {
  return (
    await client.query(
      `INSERT INTO public.user_drugs
        (user_id, drug_id)
        VALUES ($1, $2) RETURNING *`,
      [userId.id, drugId.id]
    )
  ).rows[0];
};

export default insertUserDrugPairToDb;
