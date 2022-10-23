import { faker } from "@faker-js/faker";
import type { Client } from "pg";
import { v4 as uuidv4 } from "uuid";

import insertDrugToDb from "../db/insertDrugToDb";

const generateRandomDrug = async (client: Client) => {
  const drugId = { id: uuidv4() };
  const rxcui = faker.datatype.number({ max: 10000 });
  const name = faker.random.alpha(10);
  return insertDrugToDb(client, drugId, rxcui, name);
};
export default generateRandomDrug;
