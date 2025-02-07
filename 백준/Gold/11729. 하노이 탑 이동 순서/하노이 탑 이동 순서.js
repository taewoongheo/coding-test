const N = Number(
  require("fs")
    .readFileSync(process.platform === "linux" ? "dev/stdin" : "input.txt")
    .toString()
    .trim()
);

const result = [];
hanoi(N, 1, 3, 2);
console.log(result.length);
console.log(result.map((el) => el.join(" ")).join("\n"));

function hanoi(n, from, to, other) {
  if (n === 0) return;
  hanoi(n - 1, from, other, to);
  result.push([from, to]);
  hanoi(n - 1, other, to, from);
}
