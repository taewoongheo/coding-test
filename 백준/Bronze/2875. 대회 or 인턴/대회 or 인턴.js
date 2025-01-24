const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .split(" ")
  .map(Number);

let N = input.shift();
let M = input.shift();
let K = input.shift();

let teamCnt = 0;
while (N >= 2 && M >= 1) {
  N -= 2;
  M -= 1;
  teamCnt += 1;
}

let left = N + M;
while (K !== 0) {
  K--;
  if (left === 0) {
    left += 3;
    teamCnt -= 1;
  }
  left--;
}

console.log(teamCnt);
