const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .split("\n");

const N = Number(input.shift());
const times = input
  .map((num) => num.split(" ").map((num) => +num))
  .sort((a, b) => {
    if (a[1] === b[1]) return a[0] - b[0];
    else return a[1] - b[1];
  });

let cnt = 0;
let lt = 0;
times.forEach((el) => {
  if (el[0] >= lt) {
    lt = el[1];
    cnt++;
  }
});

console.log(cnt);
