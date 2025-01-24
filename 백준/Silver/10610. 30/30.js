const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("")
  .map(Number)
  .sort((a, b) => b - a);

console.log(
  input.reduce((acc, cur) => acc + cur, 0) % 3 === 0 && input.at(-1) === 0
    ? input.join("")
    : -1
);
