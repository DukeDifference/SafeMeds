type Sex = "M" | "F" | "O";
export const isOfSex = (s: string): s is Sex => {
  return ["M", "F", "O"].includes(s);
};
export default Sex;
