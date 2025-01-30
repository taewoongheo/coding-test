const [N, M, K] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

if (M * K < N) {
  console.log(-1);
  process.exit(0);
}

if (M + K - 1 > N) {
  console.log(-1);
  process.exit(0);
}

const arr = [];
const karr = Array.from({ length: K }, (_, i) => i + 1);
arr.push(karr);

const q = Math.floor((N - K) / (M - 1));
let r = (N - K) % (M - 1);

let qarr = [];
let idx = K + 1;
while (idx !== N + 1) {
  if (r !== 0) {
    if (qarr.length === q + 1) {
      arr.push(qarr);
      qarr = [];
      r--;
    }
  } else {
    if (qarr.length === q) {
      arr.push(qarr);
      qarr = [];
    }
  }
  qarr.push(idx);
  idx++;
}
arr.push(qarr);

arr.forEach((el) => el.sort((a, b) => b - a));
const ans = arr.flat().join(" ");
console.log(ans);
