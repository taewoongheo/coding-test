const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const arr = [
  ...input.shift().split(" ").map(Number),
  ...input.shift().split(" ").map(Number),
];

console.log(arr.sort((a, b) => a - b).join(" "));
