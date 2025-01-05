const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .split("\n");

const N = Number(input.shift());
const arr = input
  .shift()
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const ans = arr.reduce((acc, cur, idx) => acc + cur * (arr.length - idx), 0);

console.log(ans);
