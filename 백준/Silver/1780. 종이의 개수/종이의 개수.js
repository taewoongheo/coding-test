
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

const N = +input.shift();
const arr = input.map((el) => el.split(" ").map(Number));
const v = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => false)
);

let minus = 0;
let one = 0;
let plus = 0;

divide(N);

console.log(minus);
console.log(one);
console.log(plus);

// N = 9;
// 1, 3, 9, ...
// 9, 3, 1

function divide(n) {
  const loop = Math.floor(N / n);
  if (loop === Infinity) return;
  for (let i = 0; i < N; i += n) {
    for (let j = 0; j < N; j += n) {
      if (!v[i][j] && check(arr[i][j], i, j, n)) {
        visit(i, j, n);
        switch (arr[i][j]) {
          case -1: {
            minus++;
            break;
          }
          case 0: {
            one++;
            break;
          }
          case 1: {
            plus++;
            break;
          }
        }
      }
    }
  }
  divide(Math.floor(n / 3));
}

function check(num, r, c, cnt) {
  for (let i = r; i < r + cnt; i++) {
    for (let j = c; j < c + cnt; j++) {
      if (arr[i][j] !== num) return false;
    }
  }
  return true;
}

function visit(r, c, cnt) {
  for (let i = r; i < r + cnt; i++) {
    for (let j = c; j < c + cnt; j++) {
      v[i][j] = true;
    }
  }
}
