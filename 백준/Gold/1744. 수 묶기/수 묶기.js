const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const N = input.shift();
const pos = input.filter((el) => el > 0).sort((a, b) => a - b);
const neg = input.filter((el) => el <= 0).sort((a, b) => b - a);

let ans = 0;
while (pos.length !== 0) {
  const el1 = pos.pop();
  const el2 = pos.pop();
  if (!el2) ans += el1;
  else ans += Math.max(el1 + el2, el1 * el2);
}

while (neg.length !== 0) {
  const el1 = neg.pop();
  const el2 = neg.pop();
  if (el2 === undefined) ans += el1;
  else ans += Math.max(el1 + el2, el1 * el2);
}

console.log(ans);
