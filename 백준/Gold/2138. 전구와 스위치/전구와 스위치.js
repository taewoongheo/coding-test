const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .split("\n");

const N = +input[0];
const cur = input[1].split("").map(Number);
const tar = input[2].split("").map(Number);
const dup = [...cur];
dup[0] = 1 - dup[0];
dup[1] = 1 - dup[1];

function solve(arr) {
  let cnt = 0;
  for (let i = 0; i < N - 1; i++) {
    if (arr[i] !== tar[i]) {
      cnt++;
      arr[i] = 1 - arr[i];
      arr[i + 1] = 1 - arr[i + 1];
      if (i !== N - 2) {
        arr[i + 2] = 1 - arr[i + 2];
      }
    }
  }
  return arr[N - 1] === tar[N - 1] ? cnt : -1;
}

let ans1 = solve(cur);
let ans2 = solve(dup);

if (ans2 !== -1) ans2++;

if (ans1 === -1) {
  console.log(ans2);
} else if (ans2 === -1) {
  console.log(ans1);
} else {
  console.log(Math.min(ans1, ans2));
}
