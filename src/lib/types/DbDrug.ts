import type Drug from "./Drug";

type DbDrug = {
  id?: string;
  rxcui: number;
  name: string;
};
export default DbDrug;

export const toDrug = (dbDrug: DbDrug): Drug => {
  return dbDrug;
};
