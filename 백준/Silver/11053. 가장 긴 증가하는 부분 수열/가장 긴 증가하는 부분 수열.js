
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .split("\n");

const N = Number(input.shift());
const arr = input.shift().split(" ").map(Number);
const ans = Array.from({ length: N }, () => 0);
ans[0] = 1;

for (let i = 1; i < N; i++) {
  let mv = 0;
  for (let j = 0; j < i; j++) {
    if (arr[i] > arr[j]) {
      mv = Math.max(ans[j], mv);
    }
  }
  ans[i] = mv + 1;
}

console.log(Math.max(...ans));
