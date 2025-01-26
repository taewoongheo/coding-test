

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

input.shift();
const pos = input.filter((el) => el > 0).sort((a, b) => a - b);
const neg = input.filter((el) => el <= 0).sort((a, b) => b - a);

let ans = 0;
while (pos.length !== 0) {
  const num1 = pos.pop();
  const num2 = pos.pop();

  if (num2 === undefined) {
    ans += num1;
    continue;
  }

  ans += Math.max(num1 + num2, num1 * num2);
}

while (neg.length !== 0) {
  const num1 = neg.pop();
  const num2 = neg.pop();

  if (num2 === undefined) {
    ans += num1;
    continue;
  }
  ans += Math.max(num1 + num2, num1 * num2);
}

console.log(ans);
