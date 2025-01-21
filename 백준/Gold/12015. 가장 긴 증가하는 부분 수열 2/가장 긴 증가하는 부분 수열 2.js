
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .split("\n");

const N = Number(input.shift());
const arr = input.shift().split(" ").map(Number);
const lis = [arr[0]];

for (let i = 1; i < N; i++) {
  const target = arr[i];

  if (lis.at(-1) < target) lis.push(target);
  else {
    let left = 0;
    let right = lis.length - 1;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (lis[mid] < target) left = mid + 1;
      else right = mid;
    }
    lis[left] = target;
  }
}

console.log(lis.length);
