import type { Client } from "pg";

import type Uuid from "../../types/Uuid";

const insertDrugToDb = async (client: Client, drugId: Uuid) => {
  return (
    await client.query(
      `INSERT INTO public.drugs
        (id)
        VALUES ($1) RETURNING id`,
      [drugId.id]
    )
  ).rows[0];
};

export default insertDrugToDb;
