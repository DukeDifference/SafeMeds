import type { Client } from "pg";

import generateRandomUser from "./generateRandomUser";

const generateRandomUsers = async (client: Client) => {
  const tasks = [];
  for (let i = 0; i < 20; i += 1) {
    tasks.push(generateRandomUser(client));
  }
  return Promise.all(tasks);
};
export default generateRandomUsers;
