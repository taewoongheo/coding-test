
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString();

const N = Number(input);
const v = Array(N).fill(-1);

let ans = 0;

function bt(row) {
  if (row === N) {
    ans++;
    return;
  }
  for (let i = 0; i < N; i++) {
    if (check(row, i)) {
      v[row] = i;
      bt(row + 1);
      v[row] = 0;
    }
  }
}

function check(row, col) {
  for (let i = 0; i < row; i++) {
    if (v[i] === col) {
      return false;
    }
    if (Math.abs(v[i] - col) === row - i) {
      return false;
    }
  }
  return true;
}

bt(0);

console.log(ans);
