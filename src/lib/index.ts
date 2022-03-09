const arr = [1, 3, 2, 4, 5];

console.log(
  arr.reduceRight<Array<number>>((pre, val) => (pre.push(val * 2), pre), [])
);
