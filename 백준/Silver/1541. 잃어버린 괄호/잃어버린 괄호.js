const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .split("-");

let ans = Number(
  input
    .shift()
    .split("+")
    .reduce((acc, cur) => Number(acc) + Number(cur), 0)
);

for (let i = 0; i < input.length; i++) {
  const sum = input[i]
    .split("+")
    .reduce((acc, cur) => Number(acc) + Number(cur), 0);
  ans -= sum;
}

console.log(ans);
