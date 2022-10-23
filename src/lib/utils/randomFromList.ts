const randomFromList = <T>(arr: T[], n: number): T[] => {
  // const result = new Array(n);
  // let len = arr.length;
  // const taken = new Array(len);
  // if (n > len)
  //   throw new RangeError("getRandom: more elements taken than available");
  // // eslint-disable-next-line no-param-reassign
  // for (; n > 0; n -= 1) {
  //   const x = Math.floor(Math.random() * len);
  //   result[n] = arr[x in taken ? taken[x] : x];
  //   // eslint-disable-next-line no-plusplus
  //   taken[x] = --len in taken ? taken[len] : len;
  // }
  // return result;
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, n);
};
export default randomFromList;
