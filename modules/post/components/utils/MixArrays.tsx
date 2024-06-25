const mixArrays = (arr1: any, arr2: any, m: any) =>
  arr1.map((v: any, i: any) => (1 - m) * v + m * arr2[i]);

export default mixArrays;
