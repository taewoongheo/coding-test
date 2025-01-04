const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .split("\n");

const [N, K] = input.shift().split(" ").map(Number);
const coins = Array.from({ length: N }, () => 0);

for (let i = 0; i < N; i++) {
  coins[N - i - 1] = Number(input.shift());
}

let cur = K;
let cnt = 0;
while (cur !== 0) {
  for (let i = 0; i < N; i++) {
    const quotient = Math.floor(cur / coins[i]);
    if (quotient > 0) {
      cnt += quotient;
      cur %= coins[i];
      break;
    }
  }
}

console.log(cnt);
