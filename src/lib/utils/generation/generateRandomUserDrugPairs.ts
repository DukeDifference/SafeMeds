import type { Client } from "pg";

import type Uuid from "lib/types/Uuid";

import generateRandomUserDrugPair from "./generateRandomUserDrugPair";

const generateRandomUserDrugPairs = async (client: Client) => {
  const userIds: Uuid[] = (await client.query(`SELECT id FROM users`)).rows;
  const drugIds: Uuid[] = (await client.query(`SELECT id FROM drugs`)).rows;

  const tasks = [];
  for (let i = 0; i < 20; i += 1) {
    tasks.push(generateRandomUserDrugPair(client, userIds, drugIds));
  }
  return (await Promise.all(tasks)).flat();
};
export default generateRandomUserDrugPairs;
