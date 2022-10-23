const randomFromList = <T>(arr: T[], n: number): T[] => {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, n);
};
export default randomFromList;
