const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const al = Array(26).fill(0);
for (let i = 0; i < N; i++) {
  const line = input[i + 1];
  for (let j = 0; j < line.length; j++) {
    const ch = line.charCodeAt(j);
    al[ch - 65] += Math.pow(10, line.length - 1 - j);
  }
}

al.sort((a, b) => b - a);

let num = 9;
let idx = 0;
let ans = 0;
while (al[idx] !== 0) {
  ans += al[idx] * num;
  num--;
  idx++;
}

console.log(ans);
