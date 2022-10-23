import type { Client } from "pg";

import insertUserDrugPairToDb from "../db/insertUserDrugPairtoDb";
import randomFromList from "../randomFromList";
import type Uuid from "lib/types/Uuid";

const generateRandomUserDrugPair = async (
  client: Client,
  userIds: Uuid[],
  drugIds: Uuid[]
) => {
  const userId = userIds[Math.floor(Math.random() * userIds.length)];
  const numDrugsToAdd = Math.floor(Math.random() * 10);
  const drugIdsToAdd = randomFromList(drugIds, numDrugsToAdd);

  return Promise.all(
    drugIdsToAdd.map(async (drugId) =>
      insertUserDrugPairToDb(client, userId, drugId)
    )
  );
};
export default generateRandomUserDrugPair;
