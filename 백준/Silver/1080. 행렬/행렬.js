
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);

const A = Array.from({ length: N }, () => []);
const B = Array.from({ length: N }, () => []);
for (let i = 0; i < N; i++) {
  A[i] = input[i].split("");
  B[i] = input[i + N].split("");
}

if (N < 3 || M < 3) {
  let flag = true;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (A[i][j] !== B[i][j]) {
        flag = false;
        break;
      }
    }
  }
  if (flag) console.log(0);
  else console.log(-1);
  process.exit(0);
}

let ans = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (canChange(i, j) && A[i][j] !== B[i][j]) {
      A[i][j] = changeNot(A[i][j]);
      A[i][j + 1] = changeNot(A[i][j + 1]);
      A[i][j + 2] = changeNot(A[i][j + 2]);
      A[i + 1][j] = changeNot(A[i + 1][j]);
      A[i + 1][j + 1] = changeNot(A[i + 1][j + 1]);
      A[i + 1][j + 2] = changeNot(A[i + 1][j + 2]);
      A[i + 2][j] = changeNot(A[i + 2][j]);
      A[i + 2][j + 1] = changeNot(A[i + 2][j + 1]);
      A[i + 2][j + 2] = changeNot(A[i + 2][j + 2]);
      ans++;
    }
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (A[i][j] !== B[i][j]) {
      console.log(-1);
      process.exit(0);
    }
  }
}

console.log(ans);

function canChange(r, c) {
  return N - r >= 3 && M - c >= 3;
}

function changeNot(bit) {
  return bit === "0" ? "1" : "0";
}
