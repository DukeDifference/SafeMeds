import type { Client } from "pg";

const insertDrugToDb = async (client: Client, rxcui: number, name: string) => {
  return (
    await client.query(
      `INSERT INTO public.drugs
        (rxcui, name)
        VALUES ($1, $2) RETURNING id, rxcui, name`,
      [rxcui, name.toLowerCase()]
    )
  ).rows[0];
};

export default insertDrugToDb;
