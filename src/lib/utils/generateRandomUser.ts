import { faker } from "@faker-js/faker";
import type { Client } from "pg";

import type Sex from "../types/Sex";
import type User from "../types/User";

import insertUserToDb from "./insertUserToDb";

const generateRandomUser = async (client: Client) => {
  const sex = ["M", "F", "O"][Math.floor(Math.random() * 3)] as Sex;
  const user: User = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    sex,
    dateOfBirth: faker.date.past(),
    email: faker.internet.email(),
    consumesAlcohol: faker.datatype.boolean(),
    consumesCaffeine: faker.datatype.boolean(),
    consumesNicotine: faker.datatype.boolean(),
    isPregnant: faker.datatype.boolean(),
  };
  await insertUserToDb(client, user);
  return user;
};
export default generateRandomUser;
