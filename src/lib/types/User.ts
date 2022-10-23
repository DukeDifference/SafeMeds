import type Email from "./Email";
import type Sex from "./Sex";

type User = {
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
