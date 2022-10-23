import type Uuid from "./Uuid";

type Drug = {
  id?: Uuid;
  rxcui: number;
  name: string;
};
export default Drug;
