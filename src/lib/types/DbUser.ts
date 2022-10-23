import type Email from "./Email";
import type Sex from "./Sex";
import type User from "./User";

type DbUser = {
  id?: string;
  first_name: string;
  last_name: string;
  sex: Sex;
  date_of_birth: Date;
  email: Email;
  consumes_alcohol: boolean;
  consumes_caffeine: boolean;
  consumes_nicotine: boolean;
};
export default DbUser;

export const toUser = (dbUser: DbUser): User => {
  return {
    id: dbUser.id,
    firstName: dbUser.first_name,
    lastName: dbUser.last_name,
    sex: dbUser.sex,
    dateOfBirth: dbUser.date_of_birth,
    email: dbUser.email,
    consumesAlcohol: dbUser.consumes_alcohol,
    consumesCaffeine: dbUser.consumes_caffeine,
    consumesNicotine: dbUser.consumes_nicotine,
  };
};
