const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0][0]);
const M = Number(input[0][2]);
const paper = Array(N)
  .fill()
  .map((el) => Array(M).fill(0));
for (let i = 0; i < N; i++) {
  const line = input[1 + i];
  for (let j = 0; j < M; j++) {
    paper[i][j] = Number(line[j]);
  }
}

let ans = 0;
for (let i = 0; i < 1 << (N * M); i++) {
  let sum = 0;

  //가로 - 0
  for (let j = 0; j < N; j++) {
    let temp = 0;
    for (let k = 0; k < M; k++) {
      const mask = 1 << (j * M + k);
      if ((i & mask) === 0) {
        temp *= 10;
        temp += paper[j][k];
      } else {
        sum += temp;
        temp = 0;
      }
    }
    sum += temp;
  }

  //세로 - 1
  for (let j = 0; j < M; j++) {
    let temp = 0;
    for (let k = 0; k < N; k++) {
      const mask = 1 << (k * M + j);
      if ((mask & i) !== 0) {
        temp *= 10;
        temp += paper[k][j];
      } else {
        sum += temp;
        temp = 0;
      }
    }
    sum += temp;
  }
  ans = Math.max(ans, sum);
}

console.log(ans);
