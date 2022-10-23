import type { Client } from "pg";
import { v4 as uuidv4 } from "uuid";

import insertDrugToDb from "../db/insertDrugToDb";

const generateRandomDrug = async (client: Client) => {
  const drugId = { id: uuidv4() };
  return insertDrugToDb(client, drugId);
};
export default generateRandomDrug;
