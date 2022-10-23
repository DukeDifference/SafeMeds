import { faker } from "@faker-js/faker";
import type { Client } from "pg";

import insertDrugToDb from "../db/insertDrugToDb";

const generateRandomDrug = async (client: Client) => {
  const rxcui = faker.unique(faker.datatype.number, [{ max: 10000 }]);
  const name = faker.random.alpha(10);
  return insertDrugToDb(client, rxcui, name);
};
export default generateRandomDrug;
