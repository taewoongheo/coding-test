const N = Number(
  require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
    .toString()
    .trim()
);

let ans = 0;
let ansArr = [];
hanoi(N, 1, 3, 2);
console.log(ans);
console.log(ansArr.map((el) => el.join(" ")).join("\n"));

function hanoi(n, from, to, other) {
  if (n === 0) return;
  hanoi(n - 1, from, other, to);
  ans++;
  ansArr.push([from, to]);
  hanoi(n - 1, other, to, from);
}
