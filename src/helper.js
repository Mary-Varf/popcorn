const average = (arr) =>
  arr?.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const KEY = "c87bbec9";

export { average, KEY };
