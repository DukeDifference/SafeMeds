import type { Client } from "pg";

import generateRandomDrug from "./generateRandomDrug";

const generateRandomDrugs = async (client: Client) => {
  const tasks = [];
  for (let i = 0; i < 200; i += 1) {
    tasks.push(generateRandomDrug(client));
  }
  return Promise.all(tasks);
};
export default generateRandomDrugs;
