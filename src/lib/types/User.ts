import type Uuid from "lib/types/Uuid";

import type Email from "./Email";
import type Sex from "./Sex";

type User = {
  id?: Uuid;
  firstName: string;
  lastName: string;
  sex: Sex;
  dateOfBirth: Date;
  email: Email;
  consumesAlcohol: boolean;
  consumesCaffeine: boolean;
  consumesNicotine: boolean;
};
export default User;
