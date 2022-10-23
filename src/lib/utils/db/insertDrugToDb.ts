import type { Client } from "pg";

import type Uuid from "../../types/Uuid";

const insertDrugToDb = async (
  client: Client,
  id: Uuid,
  rxcui: number,
  name: string
) => {
  return (
    await client.query(
      `INSERT INTO public.drugs
        (id, rxcui, name)
        VALUES ($1, $2, $3) RETURNING id, rxcui, name`,
      [id.id, rxcui, name]
    )
  ).rows[0];
};

export default insertDrugToDb;
